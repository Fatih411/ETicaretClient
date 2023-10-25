import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
constructor(private spinner : NgxSpinnerService){}
  showSpinner(spinnerName:SpinnerType){
    this.spinner.show(spinnerName);
    setTimeout(() => {
      this.spinner.hide(spinnerName);
    },3000);
  }
  hideSpinner(spinnerName:SpinnerType){
    this.spinner.hide(spinnerName);
  }
}
export enum SpinnerType{
  Ball_Scale_Multiple="s2",
  Ball_Atom="s1",
  Ball_Spin_Clockwise_Fade_Rotating="s3",
}
