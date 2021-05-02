import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpService } from "../../http.service";
import { User } from '../../user.model';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent  {

  constructor(  public httpService: HttpService,
    private router: Router,
      private route: ActivatedRoute,
      private alerts: AlertsService,) { }


  goBack(){
    this.router.navigate(['dashboard']);
  }
}
