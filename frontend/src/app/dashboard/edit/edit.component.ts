import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder,
  FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpService } from "../../http.service";
import { User } from '../../user.model';
import { AlertsService } from 'angular-alert-module';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
editEmp:FormGroup;

  constructor(private formBuilder: FormBuilder,
    public httpService: HttpService,
    private router: Router,
      private route: ActivatedRoute,
      private alerts: AlertsService,
) { }



  ngOnInit(): void {

      this.editEmp= this.formBuilder.group({
      id:[''],
      name:['',[Validators.required]],
      email:['',Validators.email],
      description:['',Validators.required],

      })


    this.httpService.getCurrentData(this.route.snapshot.params.id)
        .subscribe((result)=>{
          console.log(this.route.snapshot.params.id)
        // this.editEmp.setValue(result);
        // console.log(result[0].name);
        this.editEmp= this.formBuilder.group({

        name:[result[0].name],
        email:[result[0].email],
        description:[result[0].description],

        })

        })

  }//ng
 get f() { return this.editEmp.controls; }
  updateUser(){
    this.httpService.updateUser(this.route.snapshot.params.id,this.editEmp.value)
    .subscribe((result)=>{
      console.log(result,"data updated");
      this.router.navigate(['dashboard']);
    },err => {

            this.alerts.setMessage ('User with this email already exist ', 'error');
          }
  )
  }
  goBack(){
    this.router.navigate(['dashboard']);
  }


}
