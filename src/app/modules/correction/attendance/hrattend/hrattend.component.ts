import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrattend',
  templateUrl: './hrattend.component.html',
  styleUrls: ['./hrattend.component.css']
})
export class HRAttendComponent implements OnInit {
  correctionStatus={
    type :'hr-Correction-Status',

  }
  correctionApplication={
    type :'hr-Correction-Applicaitons',

  }
  empForm={
    type :'hr-form',
    ComponenttypeId:3
  }
  constructor() { }

  ngOnInit(): void {
  }

}
