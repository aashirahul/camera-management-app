import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import { CameraAssignment } from '../../models/camera-assignment';
import { Vehicle } from '../../models/vehicle';
import { Camera } from '../../models/camera';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {

  vehicles: Vehicle[];
  cameras: Camera[];
  assignments: CameraAssignment[];
  selectedCamera: number;
  selectedVehicle: number;
  errorMessage: string;

  constructor(private backendService: BackendService, public dialogRef: MatDialogRef<NewAssignmentComponent>) { }

  ngOnInit() {
    this.backendService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments as CameraAssignment[];
    });

    this.backendService.getCameras().subscribe((cameras) => {
      this.cameras = cameras;
    });

    this.backendService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.validate();

    if (!this.errorMessage) {
      let newCameraAssignment: CameraAssignment = {
        id: null,
        CameraId: this.selectedCamera,
        VehicleId: this.selectedVehicle,
        DateCreated: new Date(),
        Deleted: false
      }

      this.backendService.createAssignment(newCameraAssignment).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  private validate() {
    this.errorMessage = "";

    if (this.selectedCamera == null) {
      this.errorMessage += "Please select the camera to associate. ";
    }

    if (this.selectedVehicle == null) {
      this.errorMessage += "Please select the vehicle to associate. ";
    }

    if (this.findAssignmentForSelectedCamera() != null) {
      this.errorMessage += "The selected camera is already associated to another vehicle. ";
    }

    if (this.findAssignmentForSelectedVehicle() != null) {
      this.errorMessage += "The selected vehicle is already associated to another camera. ";
    }
  }

  private findAssignmentForSelectedCamera() {
    return this.assignments.find((assignment) => assignment.CameraId == this.selectedCamera);
  }

  private findAssignmentForSelectedVehicle() {
    return this.assignments.find((assignment) => assignment.VehicleId == this.selectedVehicle);
  }
}
