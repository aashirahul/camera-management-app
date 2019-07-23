import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendService } from '../../services/backend.service';
import { CameraAssignment } from '../../models/camera-assignment';
import { Vehicle } from '../../models/vehicle';
import { Camera } from '../../models/camera';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {
  vehicles: Vehicle[];
  cameras: Camera[];
  assignments: CameraAssignment[];
  selectedCamera: number;
  selectedVehicle: number;
  errorMessage: string;
  loadingProcessCount = 0;

  constructor(private backendService: BackendService, public dialogRef: MatDialogRef<EditAssignmentComponent>, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.loadingProcessCount++;
    this.backendService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments as CameraAssignment[];
      this.loadingProcessCount--;
    });

    this.loadingProcessCount++;
    this.backendService.getCameras().subscribe((cameras) => {
      this.cameras = cameras;
      this.loadingProcessCount--;
    });

    this.loadingProcessCount++;
    this.backendService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      let currentlyAssignedVehicle = this.vehicles.find((vehicle) => vehicle.Id == this.data.assignmentToEdit.VehicleId);

      if (currentlyAssignedVehicle != null) {
        this.selectedVehicle = currentlyAssignedVehicle.Id;
      }
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

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.errorMessage = "";

    if (this.selectedVehicle == null) {
      this.errorMessage += "Please select the vehicle to associate. ";
    }

    let currentAssignmentForVehicle = this.findAssignmentForSelectedVehicle();
    if (currentAssignmentForVehicle != null && currentAssignmentForVehicle.CameraId != this.data.assignmentToEdit.CameraId) {
      this.errorMessage += "The selected vehicle is already associated to another camera. ";
    }

    if (!this.errorMessage) {
      let newCameraAssignment: CameraAssignment = {
        id: null,
        CameraId: this.selectedCamera,
        VehicleId: this.selectedVehicle,
        DateCreated: new Date(),
        Deleted: false
      }

      if (currentAssignmentForVehicle != null && currentAssignmentForVehicle.CameraId == this.data.assignmentToEdit.CameraId) {
        this.dialogRef.close();
      } else {
        this.data.assignmentToEdit.VehicleId = this.selectedVehicle;
        this.loadingProcessCount++;
        this.backendService.updateAssignment(this.data.assignmentToEdit).subscribe(() => {
          this.loadingProcessCount--;
          this.dialogRef.close();
        });
      }
    }
  }

  private findAssignmentForSelectedCamera() {
    return this.assignments.find((assignment) => assignment.CameraId == this.selectedCamera);
  }

  private findAssignmentForSelectedVehicle() {
    return this.assignments.find((assignment) => assignment.VehicleId == this.selectedVehicle);
  }

}
