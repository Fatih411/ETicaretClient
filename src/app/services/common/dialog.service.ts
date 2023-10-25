import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  openDialog(dialogParameters:Partial<DialogParameters>):void{
    const dialogRef=this.dialog.open(dialogParameters.componentType,{
      width:`${dialogParameters.options?.width}px`,
      height:`${dialogParameters.options?.height}px`,
      position:dialogParameters.options?.position,
      data:dialogParameters.data,
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==dialogParameters.data)
        dialogParameters.afterClosed();
    })
  }
}

export class DialogParameters{
  componentType:ComponentType<any>;
  data:any;
  afterClosed:()=>void;
  options?:Partial<DialogOptions>=new DialogOptions();
}
export class DialogOptions{
  width?:number=250;
  height?:number;
  position?:DialogPosition;
}