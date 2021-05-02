
import { Component, OnInit, OnChanges } from "@angular/core";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';

import { AlertsService } from 'angular-alert-module';
import { HttpService } from "../http.service";
import {ActivatedRoute, Params, Router} from '@angular/router';




@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {


  ngOnInit(): void {

  }


  pwdFormControl = new FormControl("", [
    Validators.required,

  ]);
  confirmpwdFormControl = new FormControl("", [
    Validators.required,

  ]);

  constructor(public httpService: HttpService,
  private router: Router,
    private route: ActivatedRoute,
  private alerts: AlertsService,) {}

//
  reset() {
    let user = {


      password: this.pwdFormControl.value,
      confirmpassword: this.confirmpwdFormControl.value,
    }
if(this.pwdFormControl.value===this.confirmpwdFormControl.value)
{

    this.httpService.resetUser(this.route.snapshot.params.id,user).subscribe((res) => {
       console.log(res,"data updated");
     this.alerts.setMessage ('password Updated','success');
     this.router.navigate(['resetpassword']);
  },
  err => {

          this.alerts.setMessage ('Email or Password Invalid ', 'error');
        }
)}

else{
    this.alerts.setMessage ('Password doesnot match', 'error');
}


}


}
