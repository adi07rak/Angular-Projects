import { Injectable } from '@angular/core';
import{ HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { nextContext } from '@angular/core/src/render3';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  tk :any;


  constructor() { }

  intercept(req, next){
    this.tk = window.localStorage.getItem("user");
    if(this.tk){
      //console.log("fourth");
      const reqClone = req.clone({
        headers : new HttpHeaders().set("token",this.tk)
      });
      return next.handle(reqClone);
    }else{
      return next.handle(req);
    }
  }

}
