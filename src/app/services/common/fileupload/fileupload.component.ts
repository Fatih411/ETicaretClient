import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ControllerType, HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, PositionType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {
  
  constructor(private httpClient:HttpClientService,private alertify:AlertifyService,private customToastr:CustomToastrService,private dialog:MatDialog,private dialogService:DialogService,private spinner:NgxSpinnerService){}
  public files: NgxFileDropEntry[];
  
  @Input() options:Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
      this.files = files;
      const fileData:FormData=new FormData();
      for(const file of files){
        (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
          fileData.append(_file.name,_file,file.relativePath); 
        });
      }
      this.dialogService.openDialog({
        componentType:FileUploadDialogComponent,
        data:FileUploadState.Yes,
        options:{
          
        },
        afterClosed:()=>{
          this.spinner.show(SpinnerType.Ball_Atom)
          this.httpClient.post({
            controller:this.options.controller,
            action:this.options.action,
            queryString:this.options.queryString,
            headars : new HttpHeaders({"responseType":"blob"})
          },fileData,).subscribe({
            next: (next: any) => {
              this.options.isAdminPage
                ? this.alertify.message("Dosyalar başarıyla eklendi!", { messageType: MessageType.Success, dismissOthers: true ,position:PositionType.Top_Right})
                : this.customToastr.message("Dosyalar başarılı bir şekilde yüklenmiştir!", "Başarılı", {
                    meesageType: ToastrMessageType.Success,
                    position: ToastrPositionType.Top_Right,
                  });
                  this.spinner.hide(SpinnerType.Ball_Atom)
            },
            error: (error: HttpErrorResponse) => {
              this.spinner.hide(SpinnerType.Ball_Atom)
              this.options.isAdminPage
                ? this.alertify.message("Dosyalar yüklenemedi!", { messageType: MessageType.Error, dismissOthers: true })
                : this.customToastr.message("Dosyalar yüklenemedi!", "Hata!", {
                    meesageType: ToastrMessageType.Error,
                    position: ToastrPositionType.Top_Right,
                  });
                  
            },
            complete: () => {
              console.log("complete");
            },
          },);
        },
      }) 
    }
}

export class FileUploadOptions{
  controller?:ControllerType;
  action?:string;
  queryString?: string;
  explanation?:string;
  accept?:string;
  isAdminPage?: boolean = false;
}