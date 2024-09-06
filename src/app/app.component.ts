import { Component ,OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Personal Expense Tracker';
  constructor(private primengConfig: PrimeNGConfig,public router:Router){}
  ngOnInit()
  {
    this.primengConfig.ripple=true;
  }
}
