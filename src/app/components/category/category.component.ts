import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  Cid:number=0;
  c_id:string="";
  visible1:boolean=false;
  visible2:boolean=false;

  isloading:boolean=false;
  categoryForm:FormGroup=this.fb.group({
    category: [''],
  });

  updateCategory:FormGroup=this.fb.group({
    CategoryUpdate: ['']
  });

  categories:{id:number,_id:string,category:string}[]=[];

  public constructor(private fb:FormBuilder,private categoryService:CategoryService,private msgSerice:MessageService){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (res:{success?:boolean,data?:{_id:string,categoryName:string}[]}) => {
        if(res.data)
        {
          this.categories=res.data.map((category,index)=>{return {id:index+1,_id:category._id,category:category.categoryName}});
          // console.log(this.categories);
        }
      },
      (error) => {
        this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:error.error.message});
      }
    )
  }

  addCategory(){
    this.isloading=true;
    if(this.categoryForm.value.category!=="")
    this.categoryService.addCategory(this.categoryForm.value.category).subscribe(
      (data: { success?: boolean, message?: string,data?:{categoryName:string,_id:string}} ) => {
        this.categoryForm.reset();
        if (data.success) {
          // console.log(data);
          if(data.data)
          {
            this.categories.push({id:this.categories.length+1,_id:data.data._id,category:data.data.categoryName});
          }
          this.msgSerice.add({key:"bc",severity:'success',summary:'Success',detail:data.message});
        }
        else
        {
          this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:data.message});
        }
        this.isloading=false;
      },
      (error) => {
        this.categoryForm.reset();
        this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:error.error.message});
        this.isloading=false;
      }
    )
  }

  updateCategory1(){
    if(this.updateCategory.value.CategoryUpdate!=="")
    {
      this.categoryService.updateCategory(this.updateCategory.value.CategoryUpdate,this.c_id).subscribe(
        (data: { success?: boolean, message?: string,data?:{categoryName:string,_id:string}} ) => {
          this.updateCategory.reset();
          if (data.success) {
            console.log(data);
            if(data.data)
            {
              this.categories[this.Cid-1].category=data.data.categoryName;
            }
            this.closeDialog1();
            this.msgSerice.add({key:"bc",severity:'success',summary:'Success',detail:data.message});
          }
          else
          {
            this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:data.message});
          }
        },
        (error) => {
          this.updateCategory.reset();
          this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:error.error.message});
        }
      )
    }
  }

  
  deleteCategory2(){
    this.categoryService.deleteCategory(this.c_id).subscribe(
      (data: { success?: boolean, message?: string,data?:{categoryName:string,_id:string}} ) => {
        if (data.success) {
          console.log(data);
          this.categories.splice(this.Cid-1,1);
          this.closeDialog2();
          this.msgSerice.add({key:"bc",severity:'success',summary:'Success',detail:data.message});
          this.closeDialog2();
        }
        else
        {
          this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:data.message});
        }
      },
      (error) => {
        this.msgSerice.add({key:"bc", severity:'error',summary:'Error',detail:error.error.message});
      }
    )
  }

  showDialog1(id:number)
  {
    this.updateCategory.setValue({CategoryUpdate:this.categories[id-1].category});
    this.Cid=id;
    this.c_id=this.categories[id-1]._id;
    this.visible1=true;
  }
  showDialog2(id:number)
  {
    this.Cid=id;
    this.c_id=this.categories[id-1]._id;
    this.visible2=true;
  }
  closeDialog1()
  {
    this.visible1=false;
  }
  closeDialog2()
  {
    this.visible2=false;
  }
}

