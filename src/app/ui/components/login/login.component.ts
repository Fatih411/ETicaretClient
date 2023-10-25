import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(
    private userAuthService:UserAuthService,
    spinner:NgxSpinnerService,
    private authServices:AuthService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private socialAuthService:SocialAuthService,
    ) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user:SocialUser)=>{
      console.log(user);
      this.showSpinner(SpinnerType.Ball_Scale_Multiple)
      await userAuthService.googleLogin(user,()=>{
        this.authServices.identityCheck();
        this.hideSpinner(SpinnerType.Ball_Scale_Multiple)
      });
    })
    
   
    
    
    
  }
 
 async login(usernameOrEmail:string, password:string){
  this.showSpinner(SpinnerType.Ball_Spin_Clockwise_Fade_Rotating);
   await this.userAuthService.login(usernameOrEmail,password,()=> {
    this.authServices.identityCheck();
    this.activatedRoute.queryParams.subscribe(params=>{
      const retrunUrl:string = params["returnUrl"];
   
      if(retrunUrl)
        this.router.navigate([retrunUrl]);
    })
   
    this.hideSpinner(SpinnerType.Ball_Spin_Clockwise_Fade_Rotating)
   });
  }

}
