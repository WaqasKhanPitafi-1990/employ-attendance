import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import{AttendanceRoutingModule} from './attendance-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { EmpComponent } from './emp/emp.component';
import { HttpClientModule } from '@angular/common/http';
import { FormErrorModule } from '../../../shared/modules/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/modules/material/material.module';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LineManagerComponent } from './line-manager/line-manager.component';
import { HRAttendComponent } from './hrattend/hrattend.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';




@NgModule({
  declarations: [AttendanceTableComponent, AttendanceFormComponent, EmpComponent, LineManagerComponent, HRAttendComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    // FormErrorModule,
     FormsModule,
     ReactiveFormsModule,

    // FooterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ScrollingModule,
    NgxMaterialTimepickerModule
  ]
})
export class AttendanceModule { }
