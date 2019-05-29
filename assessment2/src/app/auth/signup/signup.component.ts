import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:any={};
  fail : boolean = false;
  constructor(private _loginService:LoginService, private _httpClient:HttpClient, private _router:Router) { }

  ngOnInit() {
  }

  saveUser(){
    this._loginService.saveUser(this.user).subscribe((data:any)=>{
      console.log(data);
      this._router.navigate(['/login']);
      alert("Profile has been successfully created!!");
    },(err:any)=>{
      this.fail=true;
      this._router.navigate(['/signup']);
    });
  }

}
