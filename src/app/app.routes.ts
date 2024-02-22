import {  Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './_services/auth.service';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
  
  ];