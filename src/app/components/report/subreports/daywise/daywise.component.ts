import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../../../services/reports.service';

@Component({
  selector: 'app-daywise',
  templateUrl: './daywise.component.html',
  styleUrl: './daywise.component.css'
})
export class DaywiseComponent {
  dayForm=this.fb.group({
    date:['',[Validators.required]]
  });

  labels:string[]=[];
  dataset:number[]=[];
  expenses:any;
  isDataAvailable:boolean=false;

  isloading:boolean=false;

  constructor(private fb:FormBuilder,private reportService:ReportsService) { }

  showReport()
  {
    // console.log("from daywise : ",this.dayForm.value);
    this.isloading=true;
    this.reportService.getDayWiseReport(this.dayForm.value.date).subscribe(
      (response:{success?:boolean,data?:{categoryReport:{}[],expenses:{}[]}})=>
      {
      // console.log(response);
      if(response.success)
      {
          if(response.data)
        {
          if(response.data.categoryReport && response.data.expenses){
            const {labels,dataset,expenses}= this.reportService.structureData(response.data);
            this.labels=labels;
            this.dataset=dataset;
            this.expenses=expenses;
            this.isDataAvailable=true;
          }
        }
      }
      else
      {
        // console.log("No data found");
        
        this.isDataAvailable=false;
      }
      this.isloading=false;
    },(error)=>{
      console.log(error);
      this.isloading=false;
    });
  }

}
