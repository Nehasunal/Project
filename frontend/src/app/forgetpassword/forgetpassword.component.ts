import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';

import { HttpService } from "../http.service";

import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  constructor(public httpService: HttpService,
    private alerts: AlertsService,
    private route: ActivatedRoute,) { }

    ngOnInit(){  this.alerts.setDefaults('timeout',2);}
//
  submit() {

  let user = {

    email: this.emailFormControl.value,

  }
  this.httpService.sendEmail( user).subscribe(

    data => {
      let res:any = data;


      this.alerts.setMessage ('Mail has been sent','success');
    },
    err => {
      console.log(err);

    },() => {

    }
  );
}

}
