import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Posts/home/home.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path : "post", loadChildren:"./Posts/post/post.module#PostModule"},
  { path : "home", component:HomeComponent, canActivate:[AuthGuard]},
  { path : "login", component:LoginComponent},
  { path : "signup", component:SignupComponent},
  { path : "", redirectTo:"home", pathMatch:"full"},
  { path : "**", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
