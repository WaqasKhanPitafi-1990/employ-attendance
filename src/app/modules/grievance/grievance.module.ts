import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePortalComponent } from './portals/employee-portal/employee-portal.component';
import { GrievanceRoutingModule } from './grievance-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormErrorModule } from 'src/app/shared/modules/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { FooterModule } from 'src/app/shared/modules/footer/footer.module';
import { GrievanceFormComponent } from './grievance-form/grievance-form.component';
import { GrievanceTableComponent } from './grievance-table/grievance-table.component';
import { EnquiriesComponent } from './portals/hr-portal/enquiries/enquiries.component';
import { EnquiriesDetailsComponent } from './portals/hr-portal/enquiries-details/enquiries-details.component';
import { LmEnquiriesDetailsComponent } from './portals/LM-portal/enquiries-details/enquiries-details.component';
import { LmEnquiriesComponent } from './portals/LM-portal/enquiries/enquiries.component';
import { CeoEnquiriesComponent } from './portals/CEO-portal/enquiries/enquiries.component';
import { CeoEnquiriesDetailsComponent } from './portals/CEO-portal/enquiries-details/enquiries-details.component';



@NgModule({
  declarations: [EmployeePortalComponent, GrievanceFormComponent, GrievanceTableComponent, EnquiriesComponent, EnquiriesDetailsComponent ,LmEnquiriesDetailsComponent,LmEnquiriesComponent,CeoEnquiriesComponent,CeoEnquiriesDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormErrorModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FooterModule,
    GrievanceRoutingModule

  ]
})
export class GrievanceModule { }
