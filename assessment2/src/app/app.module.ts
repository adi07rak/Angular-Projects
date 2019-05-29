import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared/shared.module';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Posts/home/home.component';
//import { HomePipe } from './home/home.pipe';
import { HomeServiceService } from './home/home-service.service';

//import { PanelBoxComponent } from './panel/panel-box/panel-box.component';
import { NavbarComponent } from './Posts/navbar/navbar.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptorService } from './Posts/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //HomePipe,
    // PostComponent,
   // PanelBoxComponent,
    NavbarComponent,
    //PostDetailComponent,
    LoginComponent,
    SignupComponent,
    //LikeComComponent,
    //EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [HomeServiceService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
