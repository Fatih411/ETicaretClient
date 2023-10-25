import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $:any


@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClient:HttpClientService,
    public dialog:MatDialog,
    private alertify:AlertifyService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService) { 
    const img=_renderer.createElement("img");
    img.setAttribute("src","assets/deleteicon.png");
    img.setAttribute("style","cursor:pointer;");
    
    img.width=20;
    img.height=20;
    _renderer.appendChild(element.nativeElement,img);
  }
  @Input() id:string;
  @Input() controller:any;
  @Output() callback:EventEmitter<any>=new EventEmitter();
  @HostListener("click")
  onClick(){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed:async ()=>{
        this.spinner.show(SpinnerType.Ball_Atom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        await this.httpClient.delete({
          controller:this.controller
        }
          ,this.id).subscribe(data=>{
            $(td.parentElement).animate({
              opacity:0,
              left:"+=50",
              height:"toogle"
            },700, ()=> {
              this.callback.emit();
              this.alertify.message(`${this.controller} Başarıyla silinmiştir.` ,{position:PositionType.Top_Right,dismissOthers:true,messageType:MessageType.Success})
            });
          },(errorResponse:HttpErrorResponse)=>{
            this.alertify.message(`${this.controller} beklenmeyen bir hata oluştu!`,{position:PositionType.Top_Right,dismissOthers:true,messageType:MessageType.Error});
            this.spinner.hide(SpinnerType.Ball_Atom);
          });
      }
    });
  }

  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==DeleteState.Yes)
        afterClosed();
    });
  }
}

