import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _toasterService:ToastrService) { }
  successMessage(msg:string) {
this._toasterService.success(msg);
  }
  erroMessage(msg:string) {
    this._toasterService.error(msg);
      }
warningMessage(msg:string) {
this._toasterService.warning(msg);
          }
}
