import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { PositionType } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

constructor(private formBuilder:FormBuilder,private userService:UserService,private toastService:CustomToastrService,spinner:NgxSpinnerService) {
  super(spinner);
}
frm:FormGroup;

  ngOnInit(): void {
    this.frm=this.formBuilder.group({
      nameSurname:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName:["",[
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email:["",[
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password:["",[
        Validators.required,
        Validators.minLength(8),
      ]],
      passwordConfirm:["",[
        Validators.required,
        Validators.minLength(8),
      ]]
    },{
      validators:(group:AbstractControl):ValidationErrors | null=>{
      let sifre= group.get("password").value;
      let sifreTekrar=group.get("passwordConfirm").value;
      return sifre===sifreTekrar?null:{notSame:true};
    }});
  }

  public get component(){
    return this.frm.controls;
  }
submitted:boolean=false;
async onSubmit(user:User){
  this.showSpinner(SpinnerType.Ball_Atom);
    this.submitted=true;
    if(this.frm.invalid)
      return;
    
   const result:Create_User = await this.userService.create(user);
   
   if(result.succedded){
    
    this.toastService.message(result.message,"Başarılı bir şekilde kayıt oldunuz.",{
      meesageType:ToastrMessageType.Success,
      position:ToastrPositionType.Top_Right
    });
    
   }
   else{
    this.toastService.message(result.message,"Kayıt Olamadınız.",{
      meesageType:ToastrMessageType.Error,
      position:ToastrPositionType.Top_Right
    });
   }
   this.hideSpinner(SpinnerType.Ball_Atom);
  }
}
