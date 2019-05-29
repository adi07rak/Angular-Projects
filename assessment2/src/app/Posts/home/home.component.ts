import { Component, OnInit } from '@angular/core';
import {HomeServiceService} from '../../home/home-service.service';
import { LoginService} from '../../auth/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeServiceService,LoginService]
})
export class HomeComponent implements OnInit {
  page : String = "hey how's the josh??";
  yesnoid: Boolean = true;
  posts : any = [];
 
  constructor(private _homeService : HomeServiceService) {}

  ngOnInit() {
    // this._homeService.getPost().subscribe((data)=>{
    //   this.posts= data;
    // });
  }

  todo() {
    console.log(this.yesnoid);
    this.yesnoid = !this.yesnoid;
    
    console.log("hello");
  }

}
