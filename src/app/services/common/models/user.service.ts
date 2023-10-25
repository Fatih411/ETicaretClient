import { Injectable } from '@angular/core';
import { ControllerType, HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClientService,private toastrService:CustomToastrService) { }
  
  async create(user:User) : Promise<Create_User> {
   const observable : Observable<Create_User | User> = this.httpClient.post<Create_User | User>({
      controller:ControllerType.Users,
    },user);
    
    return await firstValueFrom(observable) as Create_User;
  }
 
}
