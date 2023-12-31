import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import{EmpComponent} from "./emp/emp.component";
import { LineManagerComponent } from './line-manager/line-manager.component';
import { HRAttendComponent } from './hrattend/hrattend.component';




const routes:Routes=[
  {
    path:"emp",
    component:EmpComponent
  },
  {
    path:"line-manager",
    component:LineManagerComponent
  },
  {
    path:"hr",
    component:HRAttendComponent
  },



]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes) ],
  exports:[RouterModule]
})
export class AttendanceRoutingModule { }
