import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable, Subscription, Subject, asapScheduler, pipe, of, from } from 'rxjs';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, tap, filter, scan } from 'rxjs/operators';
import { User } from './user.model';

import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})


export class HttpService {

  readonly baseURL = 'http://localhost:3000/api/';
  authToken:any;
  user:any;
  constructor(private http: HttpClient,private router: Router ) {}

  loginUser(body: any) {
     return this.http.post(this.baseURL + 'login', body, { observe: 'body'});
    }
// "http://localhost:3000/api/sendmail",
    sendEmail(data) {
    return this.http.post(this.baseURL + 'sendmail', data);
  }

  resetUser(id,info){
    return this.http.put(this.baseURL + 'update/'+id,info)
      // .pipe(map(()=>""));
  }
/////////////////


  getUsers(): Observable<User[]>{
   return this.http.get<User[]>(this.baseURL + 'select',{
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })

  }


///////////////////////

  getCurrentData(id){
    return this.http.get(this.baseURL + 'selectone' +'/'+id)
  // .pipe(map(res:Response) => res.json())
  }


  updateUser(id,info){
  return this.http.put(this.baseURL + 'updateuser/'+id,info)
    // .pipe(map(()=>""));
}

addUser(info){
  return this.http.post(this.baseURL + 'add',info)
    .pipe(map(()=>""));
}
changeStatus(id,info){
return this.http.put(this.baseURL + 'change/'+id,info)
  // .pipe(map(()=>""));
}
//
// searchData(data): Observable<any> {
//     return this.http.get(this.baseURL + 'searchData?search=' + data)
//   }

searchData(data,info): Observable<any> {
    return this.http.get(this.baseURL + 'searchData?search=' + data+'&stat=' + info)
  }

////////pagin
 getUserspage(offset: number, limit: number) {
return this.http.get(this.baseURL + 'paging'+ `/${offset}/${limit}`)
}
//////////uploadFile
  uploadFile(data){
   return this.http.post(this.baseURL+ 'file', data)
}


////////auth guard


}
