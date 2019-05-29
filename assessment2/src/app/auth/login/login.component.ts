import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers:[LoginService] ****that cause lot of problems so try to avoid this line in your code::*****
})
export class LoginComponent implements OnInit {

  auth:any={};
  isLoggedIn : boolean;
  token : boolean;
  ad:any;

  constructor(private _loginService:LoginService,private _http:HttpClient,private _router:Router) { }

  ngOnInit() {
    this.auth = {};
  }

  authuser(){
    return this._loginService.authuser(this.auth);
    console.log(this.ad);
    
    }
  
}
