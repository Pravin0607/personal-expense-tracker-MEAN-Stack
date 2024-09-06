import { Component, OnInit } from '@angular/core';
import { DaywiseComponent } from './subreports/daywise/daywise.component';
import { MonthwiseComponent } from './subreports/monthwise/monthwise.component';
import { YearwiseComponent } from './subreports/yearwise/yearwise.component';
import { BetweenDatesComponent } from './subreports/between-dates/between-dates.component';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})

export class ReportComponent implements OnInit{
tabs:{title:string,content:any}[]=[]
constructor(){}

ngOnInit(): void {
    this.tabs=[
      {
        title:'Daywise',
        content:DaywiseComponent
      },
      {
        title:'Monthwise',
        content:MonthwiseComponent
      },
      {
        title:'Yearwise',
        content:YearwiseComponent
      },
      {
        title:'Between Dates',
        content:BetweenDatesComponent
      }
    ]
}


}
