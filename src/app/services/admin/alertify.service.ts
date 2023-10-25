import { Injectable } from '@angular/core';
declare var alertify : any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message: string,options: Partial<AlertifyOptions>){
    alertify.get('notifier','delay',options.delay)
    alertify.set('notifier','position',options.position)
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers){
      msg.dismissOthers();
    }
  }
  dismiss(){
    alertify.dismissAll();
  }
}
export class AlertifyOptions{
  messageType:MessageType = MessageType.Message;
  position:PositionType = PositionType.Bottom_Left;
  delay : number = 2;
  dismissOthers: boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}
export enum PositionType{
  Top_Right = "top-right",
  Top_Center = "top-center",
  Top_Left = "top-left",
  Bottom_Center = "bottom-center",
  Bottom_Right = "bottom-right",
  Bottom_Left = "bottom-left"
}
