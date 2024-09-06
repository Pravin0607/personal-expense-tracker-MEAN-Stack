import { Component, OnInit } from '@angular/core';
import { Colors } from 'chart.js';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrl: './dashboardhome.component.css'
})
export class DashboardhomeComponent implements OnInit {
  user:string='unknown';

  totalToday:number=0;
  totalMonth:number=0;
  totalYear:number=0;
  totalTill:number=0;

  isDataAvailable:boolean=false;

  data:any;
  options:any;

  constructor(private reportService:ReportsService) { }

  ngOnInit(): void {

    this.user=sessionStorage.getItem('email') as string;

    this.options={
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: 'textColor'
              }
          }
      }
  };

  // console.log("component loaded");

  this.reportService.getSummaryReport()
  .subscribe((response:any)=>{
    // console.log("response received");
    const {data}=response;
    const {amounts,categoryReporttill}=data;

    this.totalToday=amounts.totalToday;
    this.totalMonth=amounts.totalThisMonth;
    this.totalYear=amounts.totalThisYear;
    this.totalTill=amounts.totalTillNow;

    if(categoryReporttill && categoryReporttill.length>0)
    {
        this.isDataAvailable=true;
        let labels:string[]=[];
        let dataset:number[]=[];
        categoryReporttill.forEach((element:any) => {
            // convert category to titlecase
            labels.push(element['category'].charAt(0).toUpperCase() + element['category'].slice(1));
            dataset.push(element['totalAmount']);
        });

        this.data={
            labels,
            datasets: [
                {
                    data: dataset,
                }
            ]
        };               
    }
    else
    {
        this.isDataAvailable=false;
    }

    // console.log(response);
  },(err)=>{
    console.log(err);
});

  }
}
