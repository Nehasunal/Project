import { Component, OnInit, OnChanges } from "@angular/core";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';

import { User } from '../user.model';
import { AlertsService } from 'angular-alert-module';
import { HttpService } from "../http.service";
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



    emailFormControl = new FormControl("", [
      Validators.required,
      Validators.email
    ]);

    pwdFormControl = new FormControl("", [
      Validators.required,

    ]);



    constructor(public httpService: HttpService,
    private router: Router,
    private alerts: AlertsService,) {}
public users:any;
ngOnInit(){}


    login() {
      let user = {

        email: this.emailFormControl.value,
        password: this.pwdFormControl.value
      }

      this.httpService.loginUser(user).subscribe( data=>{
       if(data){
         this.users=data;

console.log("fd",this.users.token)
console.log("name11",this.users.name)

   localStorage.setItem('data',JSON.stringify(this.users))
localStorage.setItem('token', (this.users.token).toString())
         this.router.navigateByUrl('/dashboard');


       }
       else{
         localStorage.setItem('data',null);

         JSON.parse(localStorage.getItem('data'));

       }
     }
)


}
module.exports=router;
}
