import { Injectable,Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient,@Inject("baseurl") private baseurl:string) { }
  private Url(requestParameters : Partial<RequestParameters>){
    return `${requestParameters.baseUrl ? requestParameters.baseUrl:this.baseurl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
    
  }

  get<T>(requestParameters : Partial<RequestParameters>,id?:string) : Observable<T>{
    let url : string = "";
    if(requestParameters.fullEndPoint)
      url=requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}${id? `/${id}`:""}${requestParameters.queryString ? `?${requestParameters.queryString}`:""}`;

   return this.httpClient.get<T>(url,{
      headers:requestParameters.headars,
      
    });
  }
  post<T>(requestParameters:Partial<RequestParameters>, body :Partial<T>) : Observable<T>{
    let url:string = "";
    if(requestParameters.fullEndPoint)
    url=requestParameters.fullEndPoint;
  else
    url = `${this.Url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}`:""}`;

 return this.httpClient.post<T> (url,body,{
    headers:requestParameters.headars,
  });
  }
  put<T>(requestParameters:Partial<RequestParameters>, body:Partial<T>) : Observable<T> {
    let url:string = "";
    if(requestParameters.fullEndPoint)
      url=requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}`:""}`;
    return this.httpClient.put<T> (url,body,{
      headers:requestParameters.headars,
    });
  }
  delete<T>(requestParameters:Partial<RequestParameters>,id:string) : Observable<T>{
    let url:string = "";
    if(requestParameters.fullEndPoint)
      url=requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}/${id}${requestParameters.queryString ? `?${requestParameters.queryString}`:""}`;
    return this.httpClient.delete<T>(url,{
      headers:requestParameters.headars,
    });
  }
}

export class RequestParameters{
  controller?:ControllerType;
  action?:string;
  queryString?:string;
  
  headars:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string
}
export enum ControllerType{
  Products="products",
  Order="order",
  Customer="Customers",
  Users="Users",
  Auth="Auth",
  Files="Files",
  Basket="Basket"
}