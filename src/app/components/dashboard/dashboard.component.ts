import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  sidebarVisible:boolean=false;
  
  constructor(private router:Router){}
  ngOnInit(): void {

  }
logOut()
{
  sessionStorage.clear();
  this.router.navigate(['/login'])
}

}
