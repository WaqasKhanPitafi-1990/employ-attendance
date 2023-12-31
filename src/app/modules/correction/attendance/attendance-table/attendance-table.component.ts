import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { AttendanceService } from "../attendance.service";
import { SharedService } from "src/app/shared/Service/shared.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const STATUS_DATA: any[] = [
  // {
  //   smonth: "January",
  //   corrections: "21",
  //   approved: "4",
  //   spending: "0",
  //   rejected: "8",
  // },
  // {
  //   smonth: "February",
  //   corrections: "8",
  //   approved: "1.5",
  //   spending: "5",
  //   rejected: "8",
  // },
  // {
  //   smonth: "March",
  //   corrections: "8",
  //   approved: "2.25",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "April",
  //   corrections: "15",
  //   approved: "0",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "May",
  //   corrections: "-",
  //   approved: "0",
  //   spending: "0",
  //   rejected: "5",
  // },
  // {
  //   smonth: "June",
  //   corrections: "-",
  //   approved: "1",
  //   spending: "5",
  //   rejected: "5",
  // },
  // {
  //   smonth: "July",
  //   corrections: "-",
  //   approved: "0",
  //   spending: "5",
  //   rejected: "5",
  // },
  // {
  //   smonth: "Auguest",
  //   corrections: "8",
  //   approved: "5",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "September",
  //   corrections: "8",
  //   approved: "0",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "October",
  //   corrections: "15",
  //   approved: "8",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "November",
  //   corrections: "8",
  //   approved: "0",
  //   spending: "2",
  //   rejected: "2",
  // },
  // {
  //   smonth: "December",
  //   corrections: "8",
  //   approved: "0",
  //   spending: "2",
  //   rejected: "2",
  // },
  // {
  //   smonth: "January",
  //   corrections: "21",
  //   approved: "4",
  //   spending: "0",
  //   rejected: "8",
  // },
  // {
  //   smonth: "February",
  //   corrections: "8",
  //   approved: "1.5",
  //   spending: "5",
  //   rejected: "8",
  // },
  // {
  //   smonth: "March",
  //   corrections: "8",
  //   approved: "2.25",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "April",
  //   corrections: "15",
  //   approved: "0",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "May",
  //   corrections: "-",
  //   approved: "0",
  //   spending: "0",
  //   rejected: "5",
  // },
  // {
  //   smonth: "June",
  //   corrections: "-",
  //   approved: "1",
  //   spending: "5",
  //   rejected: "5",
  // },
  // {
  //   smonth: "July",
  //   corrections: "-",
  //   approved: "0",
  //   spending: "5",
  //   rejected: "5",
  // },
  // {
  //   smonth: "Auguest",
  //   corrections: "8",
  //   approved: "5",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "September",
  //   corrections: "8",
  //   approved: "0",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "October",
  //   corrections: "15",
  //   approved: "8",
  //   spending: "0",
  //   rejected: "0",
  // },
  // {
  //   smonth: "November",
  //   corrections: "8",
  //   approved: "0",
  //   spending: "2",
  //   rejected: "2",
  // },
  // {
  //   smonth: "December",
  //   corrections: "8",
  //   approved: "0",
  //   spending: "2",
  //   rejected: "2",
  // },
];
let ELEMENT_DATA: any[] = [
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: null,
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: null,
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "3",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: null,
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "3",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: null,
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "2",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: null,
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "2",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: null,
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "0",
  //   leave_type_id: null,
  //   lm_status: "2",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "2",
  //   leave_type_id: null,
  //   lm_status: "2",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "2",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "2",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "3",
  // },
  // {
  //   hr_id: 55572,
  //   employee_id: 17275,
  //   application_id: 16,
  //   employee_name: "Aziz Muhammad",
  //   application_date: "2022-05-20",
  //   correction_date: "2022-05-20",
  //   month:"May",
  //   correction_type: "attendance_correction",
  //   hr_status: "1",
  //   leave_type_id: null,
  //   lm_status: "1",
  // },
];

/**
 * @title Table with sorting
 */
@Component({
  selector: "app-attendance-table",
  templateUrl: "./attendance-table.component.html",
  styleUrls: ["./attendance-table.component.css"],
})
export class AttendanceTableComponent implements OnInit, AfterViewInit {
  constructor(
    private _attendanceService: AttendanceService,
    private cdRef: ChangeDetectorRef,
    private _sservice: SharedService
  ) {}
  totalRows = 0;
  pageSize = 20;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = [
    "application_date",
    "month",
    "correction_date",
    "lm_status",
    "hr_status",
  ];
  dataSource: any = ELEMENT_DATA;
  caURL;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Input() componentType;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  resData: any;

  ngOnInit(): void {
    this.onGetMetaData();
  }
  //get meta data on component load base on table and role
  onGetMetaData() {
    let id = +localStorage.getItem("e_code");

    if (this.componentType.type == "Emp-Correction-Applicaitons") {
      this.caURL = `/attendance_correction/employee_portal/correction_application_list?employee_id=${id}`;
      this.getAttendanceCorrectionData(this.caURL + "&per_page=20");
    } else if (this.componentType.type == "lm-Correction-Applicaitons") {
      this.caURL = `/attendance_correction/lm_portal/correction_application_list?employee_id=${id}`;
      this.getAttendanceCorrectionData(this.caURL + "&per_page=20");
    } else if (this.componentType.type == "hr-Correction-Applicaitons") {
      this.caURL = `/attendance_correction/hr_portal/correction_application_list?employee_id=${id}`;
      this.getAttendanceCorrectionData(this.caURL + "&per_page=20");
    }
    if (this.componentType.type == "Emp-Correction-Status") {
      this.caURL = `/attendance_correction/employee_portal/monthly_correction_status?employee_id=${id}`;
      this.getCorrectionStatus(this.caURL);
    } else if (this.componentType.type == "lm-Correction-Status") {
      this.caURL = `/attendance_correction/lm_portal/monthly_correction_status?employee_id=${id}`;
      this.getCorrectionStatus(this.caURL);
    } else if (this.componentType.type == "hr-Correction-Status") {
      this.caURL = `/attendance_correction/hr_portal/monthly_correction_status?employee_id=${id}`;
      this.getCorrectionStatus(this.caURL);
    }
  }
  //logic after view initialization
  ngAfterViewInit() {
    if (
      this.componentType.type === "Emp-Correction-Status" ||
      this.componentType.type === "lm-Correction-Status" ||
      this.componentType.type === "hr-Correction-Status"
    ) {
      this.dataSource = STATUS_DATA;
      this.displayedColumns = [
        "month_name",
        "corrections",
        "statusApproved",
        "pending",
        "rejected",
      ];
      this.cdRef.detectChanges();
    } else if (
      this.componentType.type === "Emp-Correction-Applicaitons" ||
      this.componentType.type === "lm-Correction-Applicaitons" ||
      this.componentType.type === "hr-Correction-Applicaitons"
    ) {
      // this.dataSource = new MatTableDataSource(this.resData);

      this.dataSource.paginator = this.paginator;
      if (
        this.componentType.type === "lm-Correction-Applicaitons" ||
        this.componentType.type === "hr-Correction-Applicaitons"
      ) {
        this.displayedColumns = [
          "employee_id",
          "employee_name",
          "application_date",
          "correction_type",
          "correction_date",
          "lm_status",
          "hr_status",
        ];
      }
      // this.pageSize=10;
      this.cdRef.detectChanges();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //To handle click on table row
  onRowClick(data: any) {
    if (
      this.componentType.type == "lm-Correction-Applicaitons" ||
      this.componentType.type == "hr-Correction-Applicaitons"
    ) {
      data.componentType = this.componentType.type;
      this._attendanceService.setRowData(data);
    }
  }

  //handle page click
  handlePage(event) {
    if (
      this.componentType.type == "Emp-Correction-Applicaitons" ||
      this.componentType.type == "lm-Correction-Applicaitons" ||
      this.componentType.type == "hr-Correction-Applicaitons"
    ) {
      let pageIndex = event.pageIndex + 1;

      this.getAttendanceCorrectionData(
        this.caURL + `&per_page=20 &page=${pageIndex}`
      );
    }
  }
  // to get the get Attendance Correction Data on the base of url
  getAttendanceCorrectionData(url) {
    this._attendanceService.getAttendMetaData(url).subscribe({
      next: (res: any) => {
        if (res.status != "failed") {
          this.dataSource = res.data.data;
          this.paginator.pageIndex = res.data.current_page - 1;
          this.paginator.length = res.data.total;
          this.paginator.pageSize = this.pageSize;
          //set the urls for pagination
        }

        this.cdRef.detectChanges();
      },
      error: (error) => {
        this._sservice.erroMessage("An error occurred");
      },
    });
  }
  //get correction status for correction status table
  getCorrectionStatus(url) {
    this._attendanceService.getAttendMetaData(url).subscribe({
      next: (res: any) => {
        if (res.status != "failed") {
          this.dataSource = res.data;
        }

        //this.cdRef.detectChanges();
      },
      error: (error) => {
        this._sservice.erroMessage("An error occurred");
      },
    });
  }
  //on scroll event
  onTableScroll(e) {
    if (
      this.componentType.type == "hr-Correction-Status" ||
      this.componentType.type == "lm-Correction-Status" ||
      this.componentType.type == "Emp-Correction-Status"
    ) {
      const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight; // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled

      // If the user has scrolled within 200px of the bottom, add more data
      const buffer = 200;
      const limit = tableScrollHeight - tableViewHeight - buffer;
      if (scrollLocation > limit) {
        // this.dataSource = this.dataSource.concat(ELEMENT_DATA);

        this.dataSource = this.dataSource.concat(STATUS_DATA);

        // this.cdRef.detectChanges();
      }
    }
  }
}
