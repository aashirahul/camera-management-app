import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatTableModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { BackendService } from './services/backend.service';
import { MockBackendService } from './services/mock-backend.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CameraAssignmentsComponent } from './components/camera-assignments/camera-assignments.component';
import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';
import { EditAssignmentComponent } from './components/edit-assignment/edit-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CameraAssignmentsComponent,
    NewAssignmentComponent,
    EditAssignmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    InMemoryWebApiModule.forRoot(MockBackendService)
  ],
  providers: [
    BackendService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewAssignmentComponent,
    EditAssignmentComponent
  ]
})
export class AppModule { }
