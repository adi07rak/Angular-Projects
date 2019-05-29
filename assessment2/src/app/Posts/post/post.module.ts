import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';


//import { HomeComponent } from '../home/home.component';
import { HomePipe } from '../../home/home.pipe';
//import { HomeServiceService } from '../../home/home-service.service';
import { PostComponent } from '../post_dis/post_dis.component';
//import { PanelBoxComponent } from '../../panel/panel-box/panel-box.component';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { LikeComComponent } from '../like-com/like-com.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthInterceptorService } from '../auth-interceptor.service';
//import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    //HomeComponent,
    HomePipe,
    //HomeServiceService,
    PostComponent,
    //PanelBoxComponent,
    PostDetailComponent,
    LikeComComponent,
    EditPostComponent,
    
    //NavbarComponent
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path : "", component:PostComponent, canActivate:[AuthGuard]},
      { path : ":pId", component:PostDetailComponent, canActivate:[AuthGuard]},
      { path : "", redirectTo:"home", pathMatch:"full"},
      { path : "**", redirectTo:"home"} 
    ])
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    },
    AuthInterceptorService
  ]
})
export class PostModule { }
