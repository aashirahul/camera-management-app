import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Observable } from 'rxjs';
import { CameraAssignment } from '../../models/camera-assignment';
import { Vehicle } from '../../models/vehicle';
import { Camera } from '../../models/camera';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';
import { EditAssignmentComponent } from '../edit-assignment/edit-assignment.component';

@Component({
  selector: 'app-camera-assignments',
  templateUrl: './camera-assignments.component.html',
  styleUrls: ['./camera-assignments.component.scss']
})
export class CameraAssignmentsComponent implements OnInit {

  displayedColumns: string[] = ['cameraId', 'vehicleId', 'id'];
  assignments: CameraAssignment[];
  filteredAssignments: CameraAssignment[];
  vehicles: Vehicle[];
  cameras: Camera[];
  searchValue: string = "";
  loadingProcessCount = 0;

  constructor(private backendService: BackendService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadAssignments();
  }

  private loadAssignments() {
    this.loadingProcessCount++;
    this.backendService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments as CameraAssignment[];
      this.filteredAssignments = this.assignments;
      this.loadingProcessCount--;
    });
  }

  getCamera(cameraId) {
    if (!this.cameras) {
      this.loadingProcessCount++;
      this.backendService.getCameras().subscribe((cameras) => {
        this.cameras = cameras;
        this.loadingProcessCount--;
      });
    }

    if (this.cameras) {
      return this.cameras.find((camera) => camera.Id == cameraId);
    }
  }

  getVehicle(vehicleId) {
    if (!this.vehicles) {
      this.loadingProcessCount++;
      this.backendService.getVehicles().subscribe((vehicles) => {
        this.vehicles = vehicles;
        this.loadingProcessCount--;
      });
    }

    if (this.vehicles) {
      return this.vehicles.find((vehicle) => vehicle.Id == vehicleId);
    }
  }

  deleteAssignment(cameraAssignment) {
    this.loadingProcessCount++;
    this.backendService.deleteAssignment(cameraAssignment).subscribe(() => {
      this.backendService.getAssignments().subscribe((assignments) => {
        this.loadingProcessCount--;
        this.assignments = assignments as CameraAssignment[];
        this.calculateFilteredAssignments();
      });
    });
  }

  newAssignment() {
    const dialogRef = this.dialog.open(NewAssignmentComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAssignments();
    });
  }

  editAssignment(cameraAssignment) {
    const dialogRef = this.dialog.open(EditAssignmentComponent, {
      width: '1000px',
      data: {
        assignmentToEdit: cameraAssignment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAssignments();
    });
  }

  onKey(event: any) {
    this.calculateFilteredAssignments();
  }

  private calculateFilteredAssignments() {
    let filteredCameras = this.cameras.filter((camera) => camera.DeviceNo.toLowerCase().startsWith(this.searchValue.toLowerCase()));
    let filteredVehicles = this.vehicles.filter((vehicle) => vehicle.Name.toLowerCase().startsWith(this.searchValue.toLowerCase()));

    this.filteredAssignments = this.assignments.filter((assignment) => filteredCameras.find((camera) => camera.Id == assignment.CameraId) || filteredVehicles.find((vehicle) => vehicle.Id == assignment.VehicleId));
  }
}
