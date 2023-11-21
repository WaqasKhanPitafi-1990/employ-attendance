export class AttendanceCorrection{
  attendance_correction_id:number
  employee_id:number;
  roster_date:Date;
  auto_fill_time_in:string;
  auto_fill_time_out:string;
  time_in:string;
  time_out:string;
  reason:string;
  lm_date:Date;
  lm_time_in:string;
  lm_time_out:string;
  lm_comments:string;
  lm_status:number
  hr_date:Date;
  hr_time_in:string;
  hr_time_out:string;
  hr_comments:string;
}
