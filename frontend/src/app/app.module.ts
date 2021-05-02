import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpService} from './http.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertsModule } from 'angular-alert-module';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { MaterialModule } from './material.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { ViewComponent } from './dashboard/view/view.component';
import { AddComponent } from './dashboard/add/add.component';
// import { AddComponent } from '.dashboard/add/add.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    EditComponent,
    ViewComponent,
    AddComponent,
    // AddComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertsModule.forRoot(),
     NgxPaginationModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
     ImageCropperModule,
    MatFormFieldModule

  ],
  providers: [HttpService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
