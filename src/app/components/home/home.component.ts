import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user:string='';

  constructor(private router:Router){}
  ngOnInit(): void {
  this.user=sessionStorage.getItem('email') as string;    
  }
logOut()
{
  sessionStorage.clear();
  this.router.navigate(['/login'])
}
}
