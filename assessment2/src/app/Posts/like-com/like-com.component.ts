import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HomeServiceService} from '../../home/home-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-like-com',
  templateUrl: './like-com.component.html',
  styleUrls: ['./like-com.component.css']
})
export class LikeComComponent implements OnInit {

  nlike: any;
  
  @Input() nested : any; 

  @Output() LikeEvent : EventEmitter<string> = new EventEmitter();

  comments : any =[];
  counter : Boolean = false;
  edit:any;
  

  constructor(private _homeService: HomeServiceService, private _router: Router) { }

  ngOnInit() {
    
    
  }

  like(data){
    this._homeService.like({_id:data}).subscribe((data:any)=>{
      this.nlike = data.res;
      this.LikeEvent.emit();
    });
    
  }

  

  comment(id,body){
    this._homeService.add_comment({p_id:id,c_body:body}).subscribe((data:any)=>{
      console.log("data");
      this.LikeEvent.emit();
      
    },(err:any)=>{
      console.log("error");
      
    });
  }

  show_comment(id){
    
    this._homeService.show_comment({_id:id}).subscribe((data:any)=>{
      this.comments = data.res;
      
    });
  
    this.counter = !this.counter;
  }

  showedit(id:any){
    //this.ed = true;
    //alert("hello");
    this._homeService.get_detail({_id:id}).subscribe((data:any)=>{
      this.edit = data.res;});
  }  

  edit_post(d1,d2,d3){
    console.log(d1);
    console.log(d2);
    console.log(d3);
    const obj = {
      p_title :d1,
      p_body : d2,
      _id : d3
    }
    this._homeService.edit_post(obj).subscribe((data)=>{
      console.log(data);
      this.LikeEvent.emit();
    });
    
    
  }

  close(){
    this.edit = [];
  }

  // sendBack(){
    
  // }

}
