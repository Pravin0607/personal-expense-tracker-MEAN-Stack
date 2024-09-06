import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { DB_URL } from './constant';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private baseUrl='http://localhost:8001/api/user/'
  private baseUrl=`${DB_URL}api/user/`
  constructor(private http:HttpClient) { }

  registerUser(userDetails:User)
  {
    // console.log(userDetails.password);
    // console.log(userDetails);
    return this.http.post(`${this.baseUrl}register/`,userDetails)
  }

  loginUser(userDetails:{email:string,password:string})
  {
    // console.log(userDetails);
    return this.http.post(`${this.baseUrl}login/`,userDetails);
  }
}
