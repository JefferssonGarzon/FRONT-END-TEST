import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers:any = {}
  constructor(private http:HttpClient) {
    this.headers['Content-Type'] = 'application/json';
   }

   viewUsers(){
    return this.http.get(environment.URL + `api/user`, {headers: this.headers});
  }

  createUser(body){
    return this.http.post(environment.URL + `api/user`, body, {headers: this.headers})
  }

}
