import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  $authstatus = new BehaviorSubject(this.UserStatus());
  temp : boolean;
  token : any;
  ad:boolean = false;

  constructor(private _router:Router,private _http:HttpClient) { }

  authuser(credentials:any){

    console.log(credentials);
      this._http.post("http://localhost:3000/auth",credentials).subscribe((res:any)=>{

        if(res.isLoggedIn){
          window.localStorage.setItem("user",res.token);
          this.$authstatus.next(this.UserStatus());
          this._router.navigate(['/home']);
          alert("User Authorized!!");
          return true;
        }
        else{
          alert("Invalid User,  Try again!!");
         this._router.navigate(['/login']);
         return false;
        }
      })

  }

  saveUser(details:any){
    return this._http.post("http://localhost:3000/signup",details);
    //alert("services are working properly.");
  }

  UserStatus(){
    this.token =  window.localStorage.getItem("user");
    if(this.token){
      return this.temp = true;
   }else{
      return this.temp = false;
   }

  }
  logout(){
    window.localStorage.removeItem("user");
    this.$authstatus.next(this.UserStatus());
    this._router.navigate(['/login']);
  }
}
