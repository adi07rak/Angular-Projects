import { Component, OnInit } from '@angular/core';
import { HomeServiceService} from '../../home/home-service.service';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-post_dis',
  templateUrl: './post_dis.component.html',
  styleUrls: ['./post_dis.component.css'],
  providers:[HomeServiceService]
})
export class PostComponent implements OnInit {

  post : any = {};
  post_dis : any = [];
  data1 : boolean;
  data2 : any;
  lk_d : any = {};
  p_id: boolean;
  _id : String;
  nlike: boolean = false;
  uname : String;
  ed : boolean;
  edit:any;

  constructor(private _homeService: HomeServiceService, private _router: Router) { }

  ngOnInit() {
    this._homeService.getPost().subscribe((data:any)=>{
      this.post_dis = data;
    });
    //console.log("ffffffff");
    this._homeService.getuname().subscribe((data:any)=>{
      this.uname = data.res;
      
    });
    
  }

  
  sendPost(){
    
    this._homeService.sendPost(this.post).subscribe((data:any)=>{
      alert("post successfully created!!");
      this.post = {};
      this.ngOnInit();},(err:any)=>{
        alert("Something is wrong!!  Try Again!!")
      })
  }

  like(data1,data2){
    this.lk_d = {
      fname : data1,
      _id : data2
    };
    this._homeService.like(this.lk_d).subscribe((data:any)=>{
      this.nlike = data.res;
      this.ngOnInit();
    });
    
  }

  del_post(id){
    this._homeService.del_post({_id:id}).subscribe((data:any)=>{
      //console.log(data.res);
      this.ngOnInit();
    });
  }

}
