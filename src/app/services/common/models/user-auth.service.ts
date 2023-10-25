import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ControllerType, HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient : HttpClientService,private toastrService:CustomToastrService) { }
  async login(UsernameOrEmail:string,Password:string, callBakcFunciton?:()=>void) : Promise<any>{
    const observable:Observable<any | TokenResponse> = this.httpClient.post<any | TokenResponse>({
       controller:ControllerType.Auth,
       action:"login",
     },{UsernameOrEmail,Password});
 
     const token : TokenResponse = await firstValueFrom(observable) as TokenResponse;
     if(token)
     {
       localStorage.setItem("accessToken", token.token.accessToken);
       localStorage.setItem("refreshToken", token.token.refreshToken);
 
       this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır.","Giriş Başarılı",{
         meesageType:ToastrMessageType.Success,
         position:ToastrPositionType.Top_Right
       });
     }
     callBakcFunciton();
   }

   async refrestTokenLogin(refreshToken:string,callBakcFunciton?:(state)=>void):Promise<any>{
    const observable:Observable<any|TokenResponse>=this.httpClient.post({
      action:"refreshtokenlogin",
      controller:ControllerType.Auth,

    },{refreshToken:refreshToken});
    try {
      const tokenResponse:TokenResponse=await firstValueFrom(observable) as TokenResponse;
      if(tokenResponse){
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }
      callBakcFunciton(tokenResponse ? true:false);
    } catch (error) {
      callBakcFunciton(false);
    }
   }
   
 
   async googleLogin(user:SocialUser,callBakcFunciton?:()=>void):Promise<any>{
     const observable:Observable<SocialUser|TokenResponse> = this.httpClient.post<SocialUser|TokenResponse>({
       action:"google-login",
       controller:ControllerType.Auth,
     },user);
     const tokenRepsone =  await firstValueFrom(observable) as TokenResponse;
     if(tokenRepsone){
       localStorage.setItem("accessToken",tokenRepsone.token.accessToken);
       localStorage.setItem("refreshToken", tokenRepsone.token.refreshToken);
       this.toastrService.message("Google login başarıyla sağlanmıştır","Giriş Başarılı",{
         meesageType:ToastrMessageType.Success,
         position:ToastrPositionType.Top_Right
       });
     }
     callBakcFunciton();
   }
}
