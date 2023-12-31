import { Component, OnInit, Input } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { contains, data } from "jquery";
import { SharedService } from "src/app/shared/Service/shared.service";
import { AttendanceService } from "../attendance.service";
import { AttendanceCorrection } from "src/app/shared/models/attendance-correction";
import { leaveReversal } from "src/app/shared/models/leave-reversal";
import { ShiftChangeData } from "src/app/shared/models/shift_change";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-attendance-form",
  templateUrl: "./attendance-form.component.html",
  styleUrls: ["./attendance-form.component.css"],
})
export class AttendanceFormComponent implements OnInit {
  @Input() componentType;
  isTesting = environment.isTesting;
  panelOpenState = false;
  attendanceCorrectionForm: any;
  leaveReversalForm: any;
  shiftChangeRequestForm: any;
  res: AttendanceCorrection;
  attendCorreMData: AttendanceCorrection;
  leaveReversalMetaData: Array<leaveReversal>;
  isEmployee: boolean;
  //to hold the selected leave type for lm
  selectedReversalData: leaveReversal;

  uploadedFile: any;
  employeeId: number;
  allShiftTypes: any;

  constructor(
    private _attendanceService: AttendanceService,
    private _sservice: SharedService
  ) {}

  ngOnInit(): void {
    this.leaveReversalMetaData = new Array<leaveReversal>();
    this.componentType.type == "Emp-form"
      ? (this.isEmployee = true)
      : (this.isEmployee = false);
    this.attendanceCorrection();
    this.leaveReversal();
    this.shiftChangeRequest();
    this.onGetMetaData();
    this.employeeId = +localStorage.getItem("e_code");

    this._attendanceService.clickedRowData.subscribe((rowData) => {
      //rowData.application_date
      rowData.componentType;
      if (rowData != "") {
        this.getRowDataForForm(rowData);
      }
    });
  }
  getRowDataForForm(rowData) {

    //for line manger get attendance correction and shift change data
    if (rowData.componentType == "lm-Correction-Applicaitons") {
      if (rowData.correction_type == "attendance_correction") {
        //for testing purpose
        this.isTesting == true ? (rowData.application_date = "2021-01-30") : "";
        this.getLmAttendanceCorrectionData(
          +rowData.employee_id,
          rowData.application_date
        );
      } else if (rowData.correction_type == "shift_change") {
          rowData.application_date
          // rowData.application_date="2021-01-30";
          this.isTesting == true ? (rowData.application_date = "2021-01-30") : "";
        this.getLmShiftChangeData(+rowData.employee_id,  rowData.application_date);
      }
    }
    //for HR manger get attendance correction and leave reversal data
    else if (rowData.componentType == "hr-Correction-Applicaitons") {
      if (rowData.correction_type == "leave_reversal") {
        this.getLeaveReversalMetaData(rowData.employee_id, rowData, true);
      } else if (rowData.correction_type == "attendance_correction") {
        //rowData.application_date="2021-04-06";

        this.isTesting == true ? (rowData.application_date = "2021-01-30") : "";
        this.getHrAttendanceCorrectionData(
          rowData,
          +rowData.employee_id,
          rowData.application_date
        );
      }
    }
  }
  //Get meta data
  onGetMetaData() {
    //get employee form section start

    if (this.componentType.type == "Emp-form") {
      let employeeId = localStorage.getItem("e_code");
      this.getLeaveReversalMetaData(employeeId, null, false);
      this.getAllShiftsTypes();
    } else if (this.componentType.type == "lm-form") {
      this.getAllShiftsTypes();
    }
  }
  getLeaveReversalMetaData(empId, rowData, isHr) {
    this.isTesting==true?empId=58480 :'';
    let data = {
      employee_id: empId,
    };
    this._attendanceService
      .getLRMetaData(
        `/attendance_correction/employee_portal/get_leave_types`,
        data
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == "success") {
            this.leaveReversalMetaData = res.data;
            isHr ? this.gethrLRMetaData(rowData) : "";
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
  }
  //leave reversal form
  leaveReversal() {
    this.leaveReversalForm = new FormGroup({
      leave_type_id: new FormControl("", Validators.required),
      from_date: new FormControl("", Validators.required),
      to_date: new FormControl("", Validators.required),
      reason: new FormControl("", Validators.required),
      hr_comments: new FormControl("", Validators.required),
      application_id: new FormControl(""),
    });
  }
  //attendance Correction form
  attendanceCorrection() {
    this.attendanceCorrectionForm = new FormGroup({
      //employee
      employee_id: new FormControl("", Validators.required),
      roster_date: new FormControl("", Validators.required),
      auto_fill_time_in: new FormControl("", Validators.required),
      auto_fill_time_out: new FormControl("", Validators.required),
      time_in: new FormControl("", Validators.required),
      time_out: new FormControl("", Validators.required),
      reason: new FormControl("", Validators.required),

      // lm
      lm_date: new FormControl("", Validators.required),
      lm_time_in: new FormControl("", Validators.required),
      lm_time_out: new FormControl("", Validators.required),
      lm_comments: new FormControl("", Validators.required),

      //hr
      hr_date: new FormControl("", Validators.required),
      hr_time_in: new FormControl("", Validators.required),
      hr_time_out: new FormControl("", Validators.required),
      hr_comments: new FormControl("", Validators.required),
    });
  }
  //shiftChange Request  form
  shiftChangeRequest() {
    this.shiftChangeRequestForm = new FormGroup({
      shift_date: new FormControl("", Validators.required),
      requested_shift: new FormControl("", Validators.required),
      current_shift: new FormControl("", Validators.required),
      reason: new FormControl("", Validators.required),
      lm_comments: new FormControl("", Validators.required),
      shift_change_id: new FormControl("", Validators.required),
    });
  }

  onSubmitAttendaceCorrection(formDirective: FormGroupDirective) {
    let formdata = this.attendanceCorrectionForm.value;
    let data = this.attendanceCorrectionForm.value;
    //formateDate
    if (
      this.componentType.type == "Emp-form" &&
      (formdata.time_in == "" ||
        formdata.time_out == "" ||
        formdata.reason == "" ||
        formdata.time_in == "null:00" ||
        formdata.time_out == "null:00")
    ) {
      return;
    }
    // data.time_in = data.time_in + ":00";
    // data.time_in = data.time_in + ":00";
    data.time_in = this.twentyFourHourTime(data.time_in);
    data.time_out = this.twentyFourHourTime(data.time_out);
    data.auto_fill_time_in = this.twentyFourHourTime(data.auto_fill_time_in);
    data.auto_fill_time_out = this.twentyFourHourTime(data.auto_fill_time_out);
    //data.time_out = data.time_out + ":00";

    //set the date and client id
    data.roster_date = this.DateFormater(data.roster_date);
    data.client_id = localStorage.getItem("client_id");
    data.employee_id = localStorage.getItem("e_code");
    let url = "/attendance_correction/employee_portal/attendance_correction";

    this.submitData(url, data, this.attendanceCorrectionForm, formDirective);
  }

  onSubmitLeaveReversal(formDirective: FormGroupDirective) {
    let formData = this.leaveReversalForm.value;
    if (
      this.componentType.type == "Emp-form" &&
      (formData.leave_type_id == "" ||
        formData.leave_type_id == null ||
        formData.reason == "" ||
        formData.reason == null ||
        formData.from_date == "" ||
        formData.from_date == null ||
        formData.to_date == "" ||
        formData.to_date == null)
    ) {
      return;
    }

    // /employee_id
    formData.client_id = +localStorage.getItem("client_id");
    formData.employee_id = +localStorage.getItem("e_code");
    formData.leave_id = this.selectedReversalData.leave_id;
    formData.from_date = this.selectedReversalData.from_date;
    formData.to_date = this.selectedReversalData.to_date;
    formData.file_upload = this.uploadedFile;
    delete formData["hr_comments"];
    delete formData["application_id"];
    let url = "/attendance_correction/employee_portal/leave_reversal_request";


    this.submitData(url, formData, this.leaveReversalForm, formDirective);
    formData = undefined;
  }
  onSubmitShiftChange(formDirective: FormGroupDirective) {
    let formdata = this.shiftChangeRequestForm.value;
    if (
      this.componentType.type == "Emp-form" &&
      (formdata.shift_date == "" ||
        formdata.requested_shift == "" ||
        formdata.reason == "")
    ) {
      return;
    }

    formdata.client_id = localStorage.getItem("client_id");
    formdata.employee_id = localStorage.getItem("e_code");
    let fromDate = this.DateFormater(formdata.from_date);
    formdata.from_date = undefined;
    formdata.from_date = fromDate;

    let toDate = this.DateFormater(formdata.to_date);
    formdata.from_date = undefined;
    formdata.to_date = toDate;
    let url = "/attendance_correction/employee_portal/shift_change_request";
    this.submitData(url, formdata, this.shiftChangeRequestForm, formDirective);
    formdata = undefined;
  }
  //on approve or disapprove by LM HR
  onApproveStatus(aproveStatus: number, formDirective) {
    let data = {};
    let url;
    let formDatadata = this.attendanceCorrectionForm.value;
    data["client_id"] = localStorage.getItem("client_id");
    data["user_id"] = localStorage.getItem("e_code");
    data["attendance_correction_id"] = 1;
    if (this.componentType.type == "lm-form") {
      if (
        formDatadata.lm_date == "" ||
        formDatadata.lm_time_in == "" ||
        formDatadata.lm_time_out == "" ||
        formDatadata.lm_comments == ""
      ) {
        this._sservice.warningMessage("unvalid data");
        return;
      }
      // lm data
      data["lm_date"] = this.DateFormater(formDatadata.lm_date);
      data["lm_time_in"] = this.twentyFourHourTime(formDatadata.lm_time_in);
      data["lm_time_out"] = this.twentyFourHourTime(formDatadata.lm_time_out);
      data["lm_comments"] = formDatadata.lm_comments;
      data["lm_status"] = aproveStatus;
      data["attendance_correction_id"] =
        this.attendCorreMData.attendance_correction_id;
      url = "/attendance_correction/lm_portal/attendance_correction_remarks";
      this.submitData(url, data, this.attendanceCorrectionForm, formDirective);
    } else if (this.componentType.type == "hr-form") {
      if (
        formDatadata.hr_date == "" ||
        formDatadata.hr_time_in == "" ||
        formDatadata.hr_time_out == "" ||
        formDatadata.hr_comments == ""
      ) {
        this._sservice.warningMessage("unvalid data");
        return;
      }
      // lm data for hr
      // data["lm_date"] = this.DateFormater(formDatadata.lm_date);
      // data["lm_time_in"] = this.twentyFourHourTime(formDatadata.lm_time_in);
      // data["lm_time_out"] = this.twentyFourHourTime(formDatadata.lm_time_out);
      // data["lm_comments"] = formDatadata.lm_comments;
      // data["lm_status"] = this.attendCorreMData.lm_status;
      data["attendance_correction_id"] =
        this.attendCorreMData.attendance_correction_id;
      //hr data
      data["hr_date"] = this.DateFormater(formDatadata.hr_date);
      data["hr_time_in"] = this.twentyFourHourTime(formDatadata.hr_time_in);
      data["hr_time_out"] = this.twentyFourHourTime(formDatadata.hr_time_out);
      data["hr_comments"] = formDatadata.hr_comments;
      data["hr_status"] = aproveStatus;
      url = "/attendance_correction/hr_portal/attendance_correction_remarks";
      this.submitData(url, data, this.attendanceCorrectionForm, formDirective);
    }
  }
  //on leave reversal approve or dis approve by human resource
  onHrLRApproveStatus(aproveStatus: number, formDirective) {
    let data: any = {};
    let url;
    let formDatadata = this.leaveReversalForm.value;
    data["client_id"] = +localStorage.getItem("client_id");
    data["hr_id"] = +localStorage.getItem("e_code");
    data["hr_status"] = aproveStatus;

    if (
      formDatadata.from_date == "" ||
      formDatadata.to_date == "" ||
      formDatadata.hr_comments == "" ||
      formDatadata.leave_type_id == "" ||
      formDatadata.reason == ""
    ) {
      this._sservice.warningMessage("unvalid data");
      return;
    }
    data["hr_comments"] = formDatadata.hr_comments;
    data["application_id"] = formDatadata.application_id;

    url = "/attendance_correction/hr_portal/leave_reversal_remarks";
    this.submitData(url, data, this.leaveReversalForm, formDirective);
  }
  //on shift change approve or dis approve by line manager
  onLMAppveStatus(aproveStatus: number, formDirective) {
    let data = {};
    let url;
    let formDatadata = this.shiftChangeRequestForm.value;

    data["client_id"] = localStorage.getItem("client_id");
    data["user_id"] = +localStorage.getItem("e_code");
    data["lm_status"] = aproveStatus;

    if (
      formDatadata.shift_date == "" ||
      formDatadata.requested_shift == "" ||
      formDatadata.current_shift == "" ||
      formDatadata.reason == "" ||
      formDatadata.lm_comments == ""
    ) {
      this._sservice.warningMessage("unvalid data");
      return;
    }

    data["shift_change_id"] = formDatadata.shift_change_id;
    data["lm_comments"] = formDatadata.lm_comments;
    url = "/attendance_correction/lm_portal/shift_change_remarks";
    this.submitData(url, data, this.shiftChangeRequestForm, formDirective);
  }
  submitData(url, data, form, formDirective) {
    //send api request
    this._attendanceService.postSubmit(url, data).subscribe({
      next: (res) => {
        res.message == "Application is already exists."
          ? this._sservice.warningMessage(res.message)
          : this._sservice.successMessage(res.message);
        form.reset();
        formDirective.resetForm();
        // this.onGetMetaData();
      },
      error: (error) => {
        this._sservice.erroMessage(error.message);
      },
    });
  }

  //to formate date
  DateFormater(inputDate) {
    let roasterDate = new Date(inputDate);
    let year = roasterDate.getFullYear();
    let date = this.numberFormater(roasterDate.getDate());
    let month = this.numberFormater(roasterDate.getMonth() + 1);
    let formatedDate = `${year}-${month}-${date}`;
    return formatedDate;
  }
  //on file upload
  onLeaveReversalFileUpload(event) {
   this.uploadedFile = undefined;
    if (event.target.files.length > 0) {
      this.uploadedFile = event.target.files[0];
    }

    this._sservice.successMessage(`File ${this.uploadedFile.name}  attached`);
  }
  //to  get atend Correction MetaData if it is not availabl.
  getEmpAttendanceCorrectionData(id, date) {
   if (this.attendCorreMData == undefined) {
      this._attendanceService
        .getAttendMetaData(
          `/attendance_correction/employee_portal/get_roster_details?employee_id=${id}&roster_date=${date}`
        )
        .subscribe({
          next: (res: any) => {
            if (res.status == "success") {
              this.attendCorreMData = res.data;

              this.attendCorreMData.auto_fill_time_in = this.twelveHourTime(
                res.data.time_in
              );
              this.attendCorreMData.time_in = "";
              this.attendCorreMData.auto_fill_time_out = this.twelveHourTime(
                res.data.time_out
              );
              this.attendCorreMData.time_out = "";
              this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
              this._sservice.successMessage(res.message);
            } else {
              this._sservice.warningMessage(res.message);
            }
          },
          error: (error) => {
            this._sservice.erroMessage(error.message);
          },
        });
    } else {
      this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    }
  }
  //to get attendance lm metadata
  getLmAttendanceCorrectionData(id, date) {
    // if (this.attendCorreMData == undefined) {
    this._attendanceService
      .getAttendMetaData(
        `/attendance_correction/lm_portal/get_employee_attendance_correction?employee_id=${id}&roster_date=${date}`
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == "success") {
            this.attendCorreMData = undefined;
            let Empdata: AttendanceCorrection =
              res.data.attendance_correction_data;
            //Empdata.auto_fill_time_in = Empdata.time_in;
            Empdata.auto_fill_time_in = this.twelveHourTime(Empdata.time_in);
            Empdata.time_in = undefined;
            // Empdata.auto_fill_time_out = Empdata.time_out;
            Empdata.auto_fill_time_out = this.twelveHourTime(Empdata.time_out);
            Empdata.time_out = undefined;
            Empdata.employee_id = id;
            Empdata.reason = res.data.attendance_correction_data.brief_reason;
            this.attendCorreMData = Empdata;
            // patch value with formate
            this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
            this._sservice.successMessage(res.message);
          } else {
            this.attendCorreMData = undefined;
            this.attendanceCorrectionForm.reset();
            this._sservice.warningMessage(res.message);
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
    // }
    //  else {
    //   this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    // }
  }
  //to get shift change  for lm of any employee
  getLmShiftChangeData(id, date) {
    // if (this.attendCorreMData == undefined) {
    this._attendanceService
      .getAttendMetaData(
        `/attendance_correction/lm_portal/get_employee_attendance_correction?employee_id=${id}&roster_date=${date}`
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == "success") {
            let shiftChangeData: ShiftChangeData;
            let data = res.data.shift_change_data;
            data.shift_date = date;
            data.reason = data.brief_reason;
            data.requested_shift = data.requested_shift_id;
            data.current_shift = data.current_shift;
            data.shift_change_id = res.data.shift_change_data.shift_change_id;
            this.shiftChangeRequestForm.patchValue(data);
            this._sservice.successMessage(res.message);
          } else {
            this.attendCorreMData = undefined;
            this.attendanceCorrectionForm.reset();
            this._sservice.warningMessage(res.message);
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
    // }
    //  else {
    //   this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    // }
  }
  // to get Hr attendance metadata
  getHrAttendanceCorrectionData(rowData, id, date) {
    let data: any = {};
    data.employee_id = id;
    data.roster_date = date;
    // if (this.attendCorreMData == undefined) {
    this._attendanceService
      .getAttendMetaData(
        `/attendance_correction/hr_portal/get_employee_lm_remarks`,
        data
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == "success") {
            this.attendCorreMData = undefined;
            let Empdata: any = {};
            let resData = res.data.employee_data;
            let lmData = res.data.lm_data[0];
            //Emp Data
            Empdata.roster_date = resData.roster_date;
            Empdata.auto_fill_time_in = this.twelveHourTime(
              resData.emp_time_in
            );
            Empdata.auto_fill_time_out = this.twelveHourTime(
              resData.emp_time_out
            );
            Empdata.employee_id = resData.employee_id;
            Empdata.reason = resData.emp_brief_reason;
            Empdata.attendance_correction_id = rowData.application_id;

            //Lm data binding
            Empdata.lm_date = lmData.lm_time_in.split(" ").shift();
            Empdata.lm_time_in = this.twelveHourTime(
              lmData.lm_time_in.split(" ").pop()
            );
            Empdata.lm_time_out = this.twelveHourTime(
              lmData.lm_time_out.split(" ").pop()
            );
            Empdata.lm_comments = lmData.lm_comments;
            Empdata.lm_status = rowData.lm_status;

            // // patch value with formate
            this.attendCorreMData = Empdata;
            this.attendanceCorrectionForm.patchValue(Empdata);
            this._sservice.successMessage(res.message);
          } else {
            this.attendCorreMData = undefined;
            this.attendanceCorrectionForm.reset();
            this._sservice.warningMessage(res.message);
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
    // }
    //  else {
    //   this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    // }
  }
  // to get Hr leave reversal metadata
  gethrLRMetaData(rowData) {
    let data: any = {};
    //correct approch

    data.employee_id = rowData.employee_id;
    data.leave_type_id = this.leaveReversalMetaData[0].leave_type_id;
    data.date = rowData.application_date;
    //

    //for test approch start
    if(this.isTesting==true){
    data.employee_id = 17275;
    data.from_date = "2022-05-12";
    data.leave_type_id = 2;
    data.date = "2021-07-13";
  }
    //test approch end
    // if (this.attendCorreMData == undefined) {
    this._attendanceService
      .postSubmit(
        `/attendance_correction/hr_portal/get_leave_reversal_application`,
        data
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == "success") {
            if (res.data != undefined) {

              let data: any = {};
              data.from_date = "2022-05-12";
              data.to_date = "2022-05-12";
              data.leave_type_id = 2;
              data.reason = res.data.emp_brief_reason;
              data.application_id = rowData.application_id;
              this.leaveReversalForm.patchValue(data);
            }

            this._sservice.successMessage(res.message);
          } else {
            this.attendCorreMData = undefined;
            this.attendanceCorrectionForm.reset();
            this._sservice.warningMessage(res.message);
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
    // }
    //  else {
    //   this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    // }
  }
  //handle date change  event for employee
  onRosterDateChange() {
    if (this.componentType.type == "Emp-form") {
      if (this.attendanceCorrectionForm.value.roster_date != null) {
        let date = this.DateFormater(
          this.attendanceCorrectionForm.value.roster_date
        );
        this.getEmpAttendanceCorrectionData(this.employeeId, date);
        //this.componentType=='emp-form'?this.getEmpAttendanceCorrectionData(this.employeeId,date):'';
      }
    } else {
      return;
    }
  }
  //to get shift date for employee when he  select the date
  onShiftDateChange() {
    if (this.shiftChangeRequestForm.value.shift_date != null) {
      let date = this.DateFormater(
        this.shiftChangeRequestForm.value.shift_date
      );
      this.getEmpShiftChangeData(this.employeeId, date);
      //this.getEmpAttendanceCorrectionData(this.employeeId, date);
      //this.componentType=='emp-form'?this.getEmpAttendanceCorrectionData(this.employeeId,date):'';
    }
  }
  //on select leave type for employee
  onSelectLeaveType(event) {
    this.selectedReversalData = undefined;
    if (this.componentType.type == "Emp-form") {
      let leaveType = this.leaveReversalMetaData.filter(
        (leave) => leave.leave_type_id == event.value
      )[0];
      let leaveReversalData: any = {};
      //this.DateFormater()
      //let Fromdate =this.DateFormater(leaveType.from_date)
      //leaveReversalData.from_date = leaveType.from_date;
      // leaveReversalData.to_date = leaveType.to_date;

      this.selectedReversalData = leaveType;

      //to patch the exact day on date picker increse the day by on
      let fromDate = new Date(leaveType.from_date);
      let year = fromDate.getFullYear();
      let date = this.numberFormater(fromDate.getDate() + 2);
      let month = this.numberFormater(fromDate.getMonth() + 1);
      let fromDateformated = `${year}-${month}-${date}`;
      //to patch the exact day on date picker increse the day by on
      let toDate = new Date(leaveType.to_date);
      let toYear = toDate.getFullYear();
      let toDay = this.numberFormater(toDate.getDate() + 2);
      let toMonth = this.numberFormater(toDate.getMonth() + 1);
      let toDateformated = `${toYear}-${toMonth}-${toDay}`;

      leaveReversalData.from_date = fromDateformated;
      leaveReversalData.to_date = toDateformated;

      this.leaveReversalForm.patchValue(leaveReversalData);
    } else {
      return;
    }
  }
  getEmpShiftChangeData(id, date) {

    let data: any = {};
    data.employee_id = id;
    data.shift_date = date;
    this._attendanceService
      .getShiftMData(
        `/attendance_correction/employee_portal/get_shift_details`,
        data
      )
      .subscribe({
        next: (res: any) => {
          if (res.status == "success") {
            data.current_shift = res.data[0].current_shift;

            this.shiftChangeRequestForm.patchValue(data);
            this._sservice.successMessage(res.message);
          } else {
            this.attendCorreMData = undefined;
            this.attendanceCorrectionForm.reset();
            this._sservice.warningMessage(res.message);
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
    // }
    //  else {
    //   this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    // }
  }
  getAllShiftsTypes() {
    // if (this.attendCorreMData == undefined) {
    this._attendanceService
      .getShiftMData(`/attendance_correction/employee_portal/get_shift_types`)
      .subscribe({
        next: (res: any) => {
          if (res.status == "pass") {
            this.allShiftTypes = res.data;
          }
        },
        error: (error) => {
          this._sservice.erroMessage(error.message);
        },
      });
    // }
    //  else {
    //   this.attendanceCorrectionForm.patchValue(this.attendCorreMData);
    // }
  }
  twelveHourTime(time: string) {
    let timArray = time.split(":");
    let hours = +timArray[0];
    let Minutes = timArray[1];
    let indicator;
    if (hours > 12) {
      hours = hours - 12;
      indicator = "PM";
    } else {
      indicator = "AM";
    }
    hours = +this.numberFormater(hours);
    let timeString = `${hours}:${Minutes} ${indicator}`;
    return timeString;
  }
  twentyFourHourTime(time: string) {
    //get all elements of time string
    let timArray = time.split(":");
    let hours = +timArray[0];
    let sArray = timArray[1].split(" ");
    let indicator = sArray[1];
    let Minutes = sArray[0];
    let timeString;
    //add hours for PM hours
    if (indicator == "PM" && hours < 12) {
      hours = hours + 12;
      timeString = `${hours}:${Minutes}:00`;
    } else if (indicator == "PM" && hours == 12 && Minutes == "00") {
      hours = hours + 12;
      timeString = `${hours}:${Minutes}:00`;
    } else if (indicator == "PM" && hours == 12 && Minutes != "00") {
      timeString = `${hours}:${Minutes}:00`;
    }

    if (indicator == "AM" && hours == 12) {
      hours = hours - 12;
      let hrs = this.numberFormater(hours);
      timeString = `${hrs}:${Minutes}:00`;
    } else if (indicator == "AM" && hours < 12) {
      let hrs = this.numberFormater(hours);
      timeString = `${hrs}:${Minutes}:00`;
    }

    return timeString;
  }
  // parse a date in yyyy-mm-dd format
  parseDate(input) {
    let parts = input.match(/(\d+)/g);

    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
  }
  //to formate number
  numberFormater(n) {
    return n > 9 ? "" + n : "0" + n;
  }
}
