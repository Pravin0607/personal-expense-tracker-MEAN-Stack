import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DB_URL } from './constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private baseUrl='http://localhost:8001/api/category'
  private baseUrl=`${DB_URL}api/category`
  constructor(private http:HttpClient) { }

  getCategories(){
    //i want to pass token from the session storage in request header
    return this.http.get(`${this.baseUrl}/all/`,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }

  addCategory(category:string){
    return this.http.post(`${this.baseUrl}/create/`,{categoryName:category},{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }

  updateCategory(category:string,id:string){
    return this.http.patch(`${this.baseUrl}/update/${id}`,{categoryName:category},{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }
  deleteCategory(id:string){
    return this.http.delete(`${this.baseUrl}/delete/${id}`,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }

}
