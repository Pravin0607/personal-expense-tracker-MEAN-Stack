import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../../../services/reports.service';

@Component({
  selector: 'app-monthwise',
  templateUrl: './monthwise.component.html',
  styleUrl: './monthwise.component.css'
})
export class MonthwiseComponent {

  monthForm = this.fb.group({
    month: ['',Validators.required],
  });

  labels:string[]=[];
  dataset:number[]=[];
  expenses:any;
  isDataAvailable:boolean=false;

  isloading:boolean=false;
  constructor(private fb:FormBuilder,private reportService:ReportsService){}

  showReport(){
    // console.log(this.monthForm.value.month);
    this.isloading=true;
    this.reportService.getMonthWiseReport(this.monthForm.value.month).subscribe(
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
