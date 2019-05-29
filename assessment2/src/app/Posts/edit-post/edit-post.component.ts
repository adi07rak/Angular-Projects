import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HomeServiceService } from '../../home/home-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  @Input() nested1 : any;
  post : any;
  @Output() EditEvent : EventEmitter<string> = new EventEmitter();
  adi:boolean;
  id:any;
  title:any;
  body:any;
  ed:boolean = true;

  constructor(private _homeService: HomeServiceService, private _router: Router) { }

  ngOnInit() {
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
      this.EditEvent.emit();
    });
    
    
  }

  showedit(){
    this.ed = true;
    alert("hello");
  }
  // edit(d1,d2,d3){
  //   console.log(d1);
  //   console.log(d2);
  //   console.log(d3);
  //   this.id = d1;
  //   this.title = d2;
  //   this.body = d3;
    
  //   this.adi =true;
  // }

}
