import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AuthGuard } from './auth.guard';

import { AddComponent } from './dashboard/add/add.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { ViewComponent } from './dashboard/view/view.component';


const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
   { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'resetpassword', component: ResetpasswordComponent},
  { path: 'resetpassword/:id', component: ResetpasswordComponent},
  { path: 'view/:id', component: ViewComponent},
  { path: 'edit/:id', component: EditComponent},

  { path: 'add', component: AddComponent}
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
