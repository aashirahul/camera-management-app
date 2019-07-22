import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MockBackendService implements InMemoryDbService {
    createDb() {
        let cameras = [
            {
                Id: 1,
                DeviceNo: '101'
            },
            {
                Id: 2,
                DeviceNo: '102'
            },
            {
                Id: 3,
                DeviceNo: '103'
            },
            {
                Id: 4,
                DeviceNo: '104'
            },
            {
                Id: 5,
                DeviceNo: '105'
            },
        ];

        let vehicles = [
            {
                Id: 1,
                Name: 'Truck111'
            },
            {
                Id: 2,
                Name: 'Truck112'
            },
            {
                Id: 3,
                Name: 'Van211'
            },
            {
                Id: 4,
                Name: 'Van212'
            },
            {
                Id: 1,
                Name: 'Truck113'
            },
        ];

        let cameraAssignments = [
            {
                id: 1,
                CameraId: 1,
                VehicleId: 2,
                DateCreated: new Date(),
                Deleted: false
            },
            {
                id: 2,
                CameraId: 2,
                VehicleId: 3,
                DateCreated: new Date(),
                Deleted: false
            },
            {
                id: 3,
                CameraId: 3,
                VehicleId: 4,
                DateCreated: new Date(),
                Deleted: true
            },
        ];
        return {
            cameras: cameras,
            vehicles: vehicles,
            cameraAssignments: cameraAssignments
        }
    }

}