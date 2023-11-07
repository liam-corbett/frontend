import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostDisplayComponent } from './post/post-display/post-display.component';
import { HomeComponent } from './home/home/home.component';
import { SignupComponent } from './auth/signup/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'display', component:PostDisplayComponent},
  {path:'add', component:PostCreateComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
