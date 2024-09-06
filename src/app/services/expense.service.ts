import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DB_URL } from './constant';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
// private baseUrl:string="http://localhost:8001/api/expense";
private baseUrl:string=`${DB_URL}api/expense`;
  constructor(private http:HttpClient) { }

  getExpenses(){
    return this.http.get(`${this.baseUrl}/all`,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }

  addExpense(expense:any){
    // console.log("from service",expense)
    // console.log("from the add exp service : ",expense);
    return this.http.post(`${this.baseUrl}/add`,expense,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }

  deleteExpense(id:string){
    return this.http.delete(`${this.baseUrl}/delete/${id}`,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }
  updateExpense(expense:any){
    return this.http.put(`${this.baseUrl}/update/${expense._id}`,expense,{headers:{'token':`${sessionStorage.getItem('token')}`}});
  }
  
}
