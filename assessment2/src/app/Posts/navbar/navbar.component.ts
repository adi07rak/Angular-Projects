import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../auth/login.service';
import { HomeServiceService } from '../../home/home-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //token: any;
  temp : any;
  uname : String;
  

  constructor(private _login:LoginService, private _homeService:HomeServiceService) { }

  ngOnInit() {
    this._login.$authstatus.subscribe((data:any)=>{
     this.temp = data;
     console.log(this.temp);
     if(this.temp){
      //alert("third");
      this._homeService.getuname().subscribe((data:any)=>{
      this.uname = data.res;
     });
   }
     
    });
    
    
    
    
  }
  

  logout(){
    this._login.logout();
  }
}
