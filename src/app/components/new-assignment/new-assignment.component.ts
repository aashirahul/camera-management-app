import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BackendService } from '../../services/backend.service';
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

  constructor(private backendService: BackendService, public dialogRef: MatDialogRef<NewAssignmentComponent>) { }

  ngOnInit() {
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

  }
}
