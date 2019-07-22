import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Observable } from 'rxjs';
import { CameraAssignment } from '../../models/camera-assignment';
import { Vehicle } from '../../models/vehicle';
import { Camera } from '../../models/camera';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';

@Component({
  selector: 'app-camera-assignments',
  templateUrl: './camera-assignments.component.html',
  styleUrls: ['./camera-assignments.component.scss']
})
export class CameraAssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['cameraId', 'vehicleId', 'id'];
  assignments: CameraAssignment[];
  vehicles: Vehicle[];
  cameras: Camera[];

  constructor(private backendService: BackendService, public dialog: MatDialog) {}

  ngOnInit() {
    this.backendService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments as CameraAssignment[];
    });
  }

  getCamera(cameraId) {
    if(!this.cameras) {
      this.backendService.getCameras().subscribe((cameras) => {
        this.cameras = cameras;
      });
    }

    if(this.cameras) {
      return this.cameras.find((camera) => camera.Id == cameraId);
    }
  }

  getVehicle(vehicleId) {
    if(!this.vehicles) {
      this.backendService.getVehicles().subscribe((vehicles) => {
        this.vehicles = vehicles;
      });
    }

    if(this.vehicles) {
      return this.vehicles.find((vehicle) => vehicle.Id == vehicleId);
    }
  }

  deleteAssignment(cameraAssignment) {
    this.backendService.deleteAssignment(cameraAssignment).subscribe(() => {
      this.backendService.getAssignments().subscribe((assignments) => {
        this.assignments = assignments as CameraAssignment[];
      });
    });
  }

  newAssignment() {
    const dialogRef = this.dialog.open(NewAssignmentComponent, {
      width: '1000px'
    });
  }
}
