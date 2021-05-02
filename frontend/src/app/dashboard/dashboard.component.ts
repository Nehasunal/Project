import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpService } from "../http.service";
import { User } from '../user.model';
import { AlertsService } from 'angular-alert-module';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


currentUser:User;

  constructor(public httpService: HttpService,
  private router: Router,
    private route: ActivatedRoute,
  private alerts: AlertsService) {
}



public users=[];

public current={name:null, token:null};
name:string;
email='';
  ngOnInit(): void {

    this.getUsers();
  }

  getUsers(){
    this.httpService.getUsers()
   .subscribe
   (data=>{
     this.current=JSON.parse(localStorage.getItem('data'));
     console.log("name",this.current.name);

     this.name=this.current.name;


     console.log(this.users=data);
  }
)}




onchange(user){

  console.log(user.status);


var state="inactive"
if(user.status=="1")
{

  user.status="0";
state="inactive";
}
else{
    user.status="1";
    state="active";
}

this.httpService.changeStatus(user.id,user)
            .subscribe(data => {
            console.log("get",data);

                 this.alerts.setMessage ( 'Status updated successfully','success');
             this.router.navigate(['/dashboard']);

        }, error => {
                this.alerts.setMessage ('error', error);
        });

    }
/////////////sort


 displayedColumns = ['name', 'email', 'description', 'status'];

sortDir=1;
onSortClick(event,col) {
  console.log("ev",event);
   let target = event.currentTarget,
     classList = target.classList;
  console.log("tar",target);
console.log("abc",target.classList);
   if (classList.contains('fa-chevron-up')) {
     classList.remove('fa-chevron-up');
     classList.add('fa-chevron-down');
     this.sortDir=-1;
   } else {
     classList.add('fa-chevron-up');
     classList.remove('fa-chevron-down');
     this.sortDir=1;
   }
if(col=='name')
   this.sortArr('name');
else if(col=='email')
   this.sortArr('email');
else if(col=='description')
   this.sortArr('description');
else if(col=='status')
   this.sortArr('status');
else
   this.sortArr('name');
 }

 sortArr(colName:any){
   this.users.sort((a,b)=>{
     a= a[colName].toLowerCase();
     b= b[colName].toLowerCase();
     return a.localeCompare(b) * this.sortDir;
   });
 }




////////////////sort end

///////////search start

//

search='';
searchData(event) {
        this.search = event.target.value

        console.log(this.search,this.search1)

        this.httpService.searchData(this.search,this.search1).subscribe((res) => {

          if (res) {
            console.log("res",res)
            this.users = res

          }
        },
          (err) => {
            console.log(err);
            console.log("error")
          })
      }
////changeStatus
search1=''
changeStatus(event){
this.search1=event.target.value;
console.log("sear",this.search1)
this.httpService.searchData(this.search,this.search1).subscribe((res) => {

  if (res) {
    console.log("res",res)
    this.users = res

  }
},
  (err) => {
    console.log(err);
    console.log("error")
  })

}



//getPaginationWithIndex
pageSizes=[5,10,15,20]
p: number = 1;
limit: number = 5;
total: number;
getPage(pageNo: number) {
   this.p = pageNo;
   this.getUserspage(this.p);
 }
 getUserspage(p: number) {
   let offset = (p - 1) * this.limit;
   this.httpService.getUserspage(offset, this.limit).subscribe(
     result => {

       // this.users = result;

     }
   )
 }
pageSize(event){
  this.limit=event.target.value;
  this.p=1;
  this.getUserspage(this.p)
}



}
