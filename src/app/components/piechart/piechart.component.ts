import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent implements OnChanges{

    // getting input from parent component
  @Input() pieChartData:any;
  @Input() tableData:any;
  @Input() isDataAvailable:boolean=false;

  piedata: any;
  pieoptions: any;
  tabledatalocal: any;


ngOnChanges(changes: SimpleChanges) {
  if(this.isDataAvailable)
  {
    this.piedata={
      labels: this.pieChartData.labels,
      datasets: [
          {
              data: this.pieChartData.dataset,
          }
      ]
    };
    this.tabledatalocal=this.tableData;
  }

  this.pieoptions={
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                color: 'textColor'
            }
        }
    }
  };

  // console.log("table data = ",this.tableData);
  // console.log("component rendered");
}


}
