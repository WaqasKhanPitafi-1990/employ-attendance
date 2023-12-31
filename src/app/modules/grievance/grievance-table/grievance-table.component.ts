import { Component,OnInit, Input } from '@angular/core'
import { CorrectionStatus } from '../../../shared/interfaces/correction-status';
import { EmployeeGrievance } from '../../../shared/interfaces/employee grievance';
const APPLICATIONS_DATA: any[] = [
  {id: 132,name:"Jack reacher", grievanceAgainst: 'Miller',grievanceAgainstId:32423, applicationDate: '25-Nov-2020', type: 'Grievance', from: '25-Nov-2020', to: '25-Nov-2020', status: 'Approved'},
  {id: 132,name:"Jack reacher", grievanceAgainst: 'Miller',grievanceAgainstId:32423, applicationDate: '25-Nov-2020', type: 'Grievance', from: '25-Nov-2020', to: '25-Nov-2020', status: 'Pending'},
  {id: 132,name:"Jack reacher", grievanceAgainst: 'Miller',grievanceAgainstId:32423, applicationDate: '25-Nov-2020', type: 'Grievance', from: '25-Nov-2020', to: '25-Nov-2020', status: 'Pending'},
  {id: 132,name:"Jack reacher", grievanceAgainst: 'Miller',grievanceAgainstId:32423, applicationDate: '25-Nov-2020', type: 'Grievance', from: '25-Nov-2020', to: '25-Nov-2020', status: 'Approved'},

];
const STATUS_DATA: CorrectionStatus[] = [
  {month: 'January', corrections: '21', approved: '4', pending: '0', rejected: '8'},
  {month: 'February', corrections: '8', approved: '1.5', pending: '5', rejected: '8'},
  {month: 'March', corrections: '8', approved: '2.25', pending: '0', rejected: '0'},
  {month: 'April', corrections: '15', approved: '0', pending: '0', rejected: '0'},
  {month: 'May', corrections: '-', approved: '0', pending: '0', rejected: '5'},
  {month: 'June', corrections: '-', approved: '1', pending: '5', rejected: '5'},
  {month: 'July', corrections: '-', approved: '0', pending: '5', rejected: '5'},
  {month: 'Auguest', corrections: '8', approved: '5', pending: '0', rejected: '0'},
  {month: 'September', corrections: '8', approved: '0', pending: '0', rejected: '0'},
  {month: 'October', corrections: '15', approved: '8', pending: '0', rejected: '0'},
  {month: 'November', corrections: '8', approved: '0', pending: '2', rejected: '2'},
  {month: 'December', corrections: '8', approved: '0', pending: '2', rejected: '2'},
];

@Component({
  selector: 'app-grievance-table',
  templateUrl: './grievance-table.component.html',
  styleUrls: ['./grievance-table.component.css'],

})

export class GrievanceTableComponent implements OnInit {

  @Input() applicationType;
  selectedValue: string;
  selectedCar: string;


  statusColumns: string[] = ['employeeId','employeeName', 'grievanceAgainstName', 'applicationDate', 'type', 'from', 'to', 'status'];


  applicationColums: string[] = ['id','name', 'grievanceAgainst', 'applicationDate', 'type', 'from', 'to', 'status'];

  columnsToDisplay:string[];
  ApplicationDataSource = APPLICATIONS_DATA;
  constructor() { }

  ngOnInit(): void {

console.log(this.applicationType.ComponenttypeId)
if(this.applicationType.ComponenttypeId==1||this.applicationType.ComponenttypeId==4){
  this.getEmployeePortalData();
}
else if(this.applicationType.ComponenttypeId==2){
  this.getHrEnquires();
}
  }
  getEmployeePortalData(){
    let columns=this.applicationColums.splice(1,1)
    console.log(columns);
    this.columnsToDisplay=[...this.applicationColums]
  }
  getHrEnquires(){
    let columns=this.applicationColums.splice(2,1)
    console.log(columns);
    this.columnsToDisplay=[...this.applicationColums]
  }



}
