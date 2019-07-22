import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewAssignmentComponent } from './components/new-assignment/new-assignment.component';

const routes: Routes = [
  { path: 'new-assignment', component: NewAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
