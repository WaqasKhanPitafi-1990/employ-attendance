import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-grievance-form',
  templateUrl: './grievance-form.component.html',
  styleUrls: ['./grievance-form.component.css']
})


export class GrievanceFormComponent implements OnInit {
  @Input() applicationType;
  grievanceForm:any;
  constructor() { }


  ngOnInit(): void {
    console.log(this.applicationType.ComponenttypeId);
    this.grievanceForm=new FormGroup({
      name:new FormControl('',Validators.required),
      grievanceAgainstId:new FormControl('',Validators.required),
      employeeDeprtment:new FormControl('',Validators.required),
      employeeDesignation:new FormControl('',Validators.required),
      targetTypeId:new FormControl('',Validators.required),
      againstDepartment:new FormControl('',Validators.required),
      againstDesignation:new FormControl('',Validators.required),
      from:new FormControl(''),
      to:new FormControl(''),
    });


  }

  onSubmit(){
    console.log('submit trigger ');
    console.log(this.grievanceForm.value);
  }
  fileUpload(event){
console.log(event.target.files)
console.log(event)
  }

}
