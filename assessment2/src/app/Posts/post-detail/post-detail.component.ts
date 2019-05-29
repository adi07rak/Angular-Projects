import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeServiceService } from '../../home/home-service.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers:[HomeServiceService]
})
export class PostDetailComponent implements OnInit {

  post_id : any;
  post:any;
  p_imp:any;
  fname :any;
  p_title:any;
  p_body:any;

  constructor(private _activatedRoute : ActivatedRoute, private _homeService: HomeServiceService, private _router:Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data)=>{
      this.post_id = data;
      //console.log(this.post_id);
    });
    this._homeService.get_detail({_id:this.post_id.pId}).subscribe((data:any)=>{
      this.post = data.res;
      // this.p_imp = data.res[0].p_imp;
      // this.fname = data.res[0].fname;
      // this.p_title= data.res[0].p_title;
      // this.p_body = data.res[0].p_body;

      //console.log(data.res[0].p_imp);
      
    });
  }

  del_post(id){
    this._homeService.del_post({_id:id}).subscribe((data:any)=>{
      //console.log(data.res);
      this._router.navigate(['/post']);
    });
  }

}
