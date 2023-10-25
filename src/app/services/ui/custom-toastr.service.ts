import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  message(message: string,title:string,toastrOptions:Partial<ToastrOptions>){
    this.toastr[toastrOptions.meesageType](message,title, {
      positionClass:toastrOptions.position
    });
  }

}
export class ToastrOptions{
  meesageType:ToastrMessageType;
  position:ToastrPositionType
}

export enum ToastrMessageType{
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning"
}
export enum ToastrPositionType{
  Top_Right = "toast-top-right",
  Top_Center = "toast-top-center",
  Top_Left = "toast-top-left",
  Bottom_Center = "toast-bottom-center",
  Bottom_Right = "toast-bottom-right",
  Bottom_Left = "toast-bottom-left",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width"
}