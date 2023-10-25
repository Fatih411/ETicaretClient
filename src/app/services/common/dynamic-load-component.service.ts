import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component:loadComponentName,viemContainerRef:ViewContainerRef){
    let _component:any = null;

    switch(component){
      case loadComponentName.BasketsComponent:
      _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
      break;
    }

    viemContainerRef.clear();
    return viemContainerRef.createComponent(_component)
  }

}

export enum loadComponentName{
  BasketsComponent
}
