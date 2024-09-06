import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { DB_URL } from './constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // baseUrl="http://localhost:8001/api/user/"
  baseUrl=`${DB_URL}api/user/`;
  data:Partial<User>={};
  constructor(private http:HttpClient)
  { 
    // this.data={id:101,firstName:'pravin',lastName:'Adhav',email:sessionStorage.getItem('email') as string,password:''};
  };

  updateUser(user:any){
    // console.log(user);
   return this.http.patch(this.baseUrl+'update',user,{headers:{'token':`${sessionStorage.getItem('token')}`}});

  }
  getUser(){
    return this.http.get(this.baseUrl,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }
  deleteUser(){
    return this.http.delete(this.baseUrl+'delete',{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }
}
