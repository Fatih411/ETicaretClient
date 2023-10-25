import { Component, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { DynamicLoadComponentService, loadComponentName } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;

  constructor(public authServices:AuthService,private toastrService:CustomToastrService,private router:Router,private dynamicLoadComponentService:DynamicLoadComponentService){

    authServices.identityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
    this.authServices.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Başarılı bir şekilde çıkış yaptınız.","Oturum Kapatıldı",{
      meesageType:ToastrMessageType.Info,
      position:ToastrPositionType.Top_Right
    })
  }

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(loadComponentName.BasketsComponent,this.dynamicLoadComponentDirective.viewContainerRef)
  }
}