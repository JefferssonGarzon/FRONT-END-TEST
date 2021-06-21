import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers:any = {}
  constructor(private http:HttpClient) {
    this.headers['Content-Type'] = 'application/json';
   }
   viewUsers(){
    return this.http.get(`/api/user`, {headers: this.headers});
  }

  createUser(body){
    return this.http.post(`/api/user`, body, {headers: this.headers})
  }

}
