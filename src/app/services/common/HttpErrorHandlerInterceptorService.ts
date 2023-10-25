import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from '../ui/custom-toastr.service';

import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomToastrService,private userAuthService:UserAuthService,private router:Router,private ngxSpinner:NgxSpinnerService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler) : Observable<HttpEvent<any>>{

    return next.handle(req).pipe(catchError(error=>{
      switch(error.status){
        case HttpStatusCode.Unauthorized:

          
          
          this.userAuthService.refrestTokenLogin(localStorage.getItem("refreshToken"),(state)=>{
            const url = this.router.url
            if(!state){
              if(url=="/products"){
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.","Oturum Açınızz",{
                  meesageType:ToastrMessageType.Warning,
                  position:ToastrPositionType.Top_Right
                })
              }
              else
                this.toastrService.message("Buraya erişim sağlayamadınız.","Yetkisiz İşlem Yaptınız.",{
                meesageType:ToastrMessageType.Warning,
                position:ToastrPositionType.BottomFullWidth
              });
            }
          }).then(data=>{});
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucu erişilmiyor.","Sunucu hatası.",{
            meesageType:ToastrMessageType.Warning,
            position:ToastrPositionType.Top_Left
          })
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı.","Geçersiz İstek.",{
            meesageType:ToastrMessageType.Warning,
            position:ToastrPositionType.Top_Left
          })
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı!.","Sayfa Erişimi.",{
            meesageType:ToastrMessageType.Warning,
            position:ToastrPositionType.Top_Left
          })
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!.","Hata!",{
            meesageType:ToastrMessageType.Warning,
            position:ToastrPositionType.Top_Left
          })
          break;
      }
      this.ngxSpinner.hide(SpinnerType.Ball_Atom)
      return of(error);
    }));
  }
}
