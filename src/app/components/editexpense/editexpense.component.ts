import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editexpense',
  templateUrl: './editexpense.component.html',
  styleUrl: './editexpense.component.css'
})
export class EditexpenseComponent implements OnInit{
  visible1:boolean=false;
  visible2:boolean=false;
  @Input() Eid:number=0;
  public constructor(){}

  ngOnInit(): void {
      
  }
  
  showDialog1() {
    this.visible1 = true;
}

closeDialog1() {
    this.visible1 = false;
}

showDialog2() {
  this.visible2 = true;
}

closeDialog2() {
  this.visible2 = false;
}
}
