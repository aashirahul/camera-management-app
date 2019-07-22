import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { Camera } from '../models/camera';
import { CameraAssignment } from '../models/camera-assignment';

@Injectable()
export class BackendService {
    base_url: string = 'http://mybackend.com/api/';
    cameras_endpoint = 'cameras';
    vehicles_endpoint = 'vehicles';
    camera_assignments_endpoint = "cameraAssignments"
    constructor(private http: HttpClient) {}

    getAssignments(): Observable<CameraAssignment[]> {
        let nonDeletedQueryParam = '?Deleted=^false';
        return this.http.get<CameraAssignment[]>(this.base_url + this.camera_assignments_endpoint + nonDeletedQueryParam);
    }

    createAssignment(cameraAssignment: CameraAssignment) {
        return this.http.post(this.base_url + this.camera_assignments_endpoint, cameraAssignment);
    }

    updateAssignment(cameraAssignment: CameraAssignment) {
        return this.http.put(this.base_url + this.camera_assignments_endpoint, cameraAssignment);
    }

    deleteAssignment(cameraAssignment: CameraAssignment) {
        cameraAssignment.Deleted = true;
        return this.updateAssignment(cameraAssignment);
    }

    getVehicles(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(this.base_url + this.vehicles_endpoint);
    }

    getCameras(): Observable<Camera[]> {
        return this.http.get<Camera[]>(this.base_url + this.cameras_endpoint);
    }
}