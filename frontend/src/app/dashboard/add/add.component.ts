import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule,FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpService } from "../../http.service";
import { User } from '../../user.model';
import { AlertsService } from 'angular-alert-module';
import { ImageCroppedEvent, base64ToFile} from 'ngx-image-cropper';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public httpService: HttpService,
    private router: Router,
      private route: ActivatedRoute,
      private alerts: AlertsService,) { }

  ngOnInit(): void {
  }
  ///add user//////////
  model = new User();
    addUser(){
        this.httpService
          .addUser(this.model)
          .subscribe((data)=> this.goBack(),
          err => {

                  this.alerts.setMessage ('Email already exist ', 'error');
                });
    }
    goBack(){
       this.router.navigate(['/dashboard']);
     }
///////////////file upload//////////

title = 'fileUpload';
 images;

  onSubmit(){
     const formData = new FormData();
     formData.append('file', this.images);
     this.httpService.uploadFile(formData)
     .subscribe((data)=>{
        this.alerts.setMessage ('File uploaded ', 'success');

     },
       err => {

               this.alerts.setMessage ('Not upload ', 'error');
             });

   }
//////////////crop image
imageChangedEvent: any = '';

  croppedImage: any = '';

  selectImage(event) {

      this.imageChangedEvent = event;

  }

  imageCropped(event: ImageCroppedEvent) {

      this.croppedImage = event.base64;
      const file= this.base64ToFile(
        event.base64,
        this.imageChangedEvent.target.files[0].name,
      )
       this.images =file;

  }

  base64ToFile(data, filename) {
  const arr = data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}


  imageLoaded() {}

  cropperReady() {}

  loadImageFailed() {}

}//end
