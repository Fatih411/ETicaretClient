import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  CanActivateFn,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/custom-toastr.service';

/*
export const authGuard: CanActivateFn = (route, state) => {

  var jwtHelperService : JwtHelperService = new JwtHelperService();
  var alertifyService:AlertifyService=new AlertifyService();
  var ngxSpinner:NgxSpinnerService=new NgxSpinnerService();
ngxSpinner.show(SpinnerType.Ball_Spin_Clockwise_Fade_Rotating);
  const token:string = localStorage.getItem("accessToken");
  //const decodeToken = jwtHelperService.decodeToken(token);
  //const expirationDate:Date = jwtHelperService.getTokenExpirationDate(token);
  let expired :boolean;
  try {
    expired = jwtHelperService.isTokenExpired(token);
  } catch (error) {
    expired=true;
  }
  if(!token||expired) {
    route.
      navigate([""], {queryParams: { returnUrl : state.url } });
    alertifyService.message("Oturum açmanız gerekiyor",{
      position:PositionType.Top_Right,
      messageType:MessageType.Warning,
    })
  }
  ngxSpinner.hide(SpinnerType.Ball_Spin_Clockwise_Fade_Rotating);

  return true;
};*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService: CustomToastrService, private spinner: NgxSpinnerService,) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree | Observable<boolean | UrlTree> {
    this.spinner.show(SpinnerType.Ball_Atom);
   

    if(!_isAuthenticated) {
      this.router.navigate(["login"], {queryParams: { returnUrl : state.url } });
      this.toastrService.message("Oturum açmanız gerekiyor","Yetkisiz Kullanıcı",{
        meesageType:ToastrMessageType.Error,
        position:ToastrPositionType.Top_Right,
      })
    }
    this.spinner.hide(SpinnerType.Ball_Atom);
    

    return true;
  }
}