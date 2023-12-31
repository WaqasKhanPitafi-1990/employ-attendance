import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HttpService } from 'src/app/shared/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private _httpService:HttpService ) { }
  private clickedRow=new BehaviorSubject<any>('') ;
  clickedRowData=this.clickedRow.asObservable();
  setRowData(clickedRow:any){
    this.clickedRow.next(clickedRow)
  }
  postSubmit(url,data){

    return this._httpService.post(url,data)
  }
  getAttendMetaData(url,data? ){

    return this._httpService.get(url,data);
  }
  getLRMetaData(url,data? ){

    return this._httpService.get(url,data);
  }
  getShiftMData(url,data? ){

    return this._httpService.get(url,data);
  }
}
