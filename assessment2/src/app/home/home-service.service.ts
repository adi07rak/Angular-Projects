import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HomeServiceService {

  tk :any = window.localStorage.getItem("user");
  

  constructor(private _http: HttpClient) { }
  
  getPost(){
    return this._http.get("http://localhost:3000/get_post");  
  }

  sendPost(details:any){
    
    console.log(details);
    return this._http.post("http://localhost:3000/createpost",details);
  }

  like(obj:any){
    return this._http.post("http://localhost:3000/like",obj);
  }

  getuname(){
    return this._http.get("http://localhost:3000/getuname");
  }

  del_post(id:any){
    return this._http.post("http://localhost:3000/delete",id);
  }

  add_comment(obj:any){
    return this._http.post("http://localhost:3000/createcomment",obj);
  }

  show_comment(obj:any){
    return this._http.post("http://localhost:3000/show_comments",obj);
  }

  edit_post(obj:any){
    return this._http.post("http://localhost:3000/edit_post",obj);
  }

  get_detail(obj:any){
    return this._http.post("http://localhost:3000/get_detail",obj);
  }

}
