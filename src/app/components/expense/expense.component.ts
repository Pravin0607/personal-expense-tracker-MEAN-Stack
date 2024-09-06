import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseService } from "../../services/expense.service";
import { CategoryService } from "../../services/category.service";
import { MessageService } from "primeng/api";

type Expense = {_id: string, amount: number, description: string, date: Date, category: string,categoryId:{categoryName: string, _id: string}};

@Component({
  selector: "app-expense",
  templateUrl: "./expense.component.html",
  styleUrl: "./expense.component.css",
})
export class ExpenseComponent implements OnInit {
  visible1 = false;
  visible2 = false;
  Eid = 0;
  ExpenseId = "";
  value1 = 0;
  maxDate = new Date();
  categories: { categoryName: string, _id: string }[] | undefined;
  expenseform: FormGroup = new FormGroup({});
  expenseUpdateform: FormGroup = new FormGroup({});
  expenses: Expense[] = [];

  isloading = false;
  constructor(
    private formbuilder: FormBuilder,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.expenseform = this.formbuilder.group({
      amount: [, [Validators.required]],
      description: ["", []],
      date: [, [Validators.required]],
      selectedCategory: ["", [Validators.required]],
    });

    this.expenseUpdateform = this.formbuilder.group({
      amount: [0, [Validators.required]],
      description: ["", []],
      date: [new Date(), [Validators.required]],
      selectedCategory: ["", [Validators.required]],
    });

    this.maxDate = new Date();

    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data.data;
      },
      (error: any) => {
        this.msgService.add({
          key: "bc",
          severity: "error",
          summary: "Error",
          detail: error.error.message,
        });
      }
    );

    this.loadAllExpenses();
  }
loadAllExpenses() {
  this.expenseService.getExpenses().subscribe(
    (data: any) => {
      this.expenses = data.data;
      console.log("get all data ", data.data)
    },
    (error: any) => {
      console.log("get all error ", error);
    }
  );
}
  addExpense() {  
    // console.log(this.expenseform.value.date);
    this.isloading = true;
    this.expenseService.addExpense(this.expenseform.value).subscribe(
      (data: { success?: boolean, message?: string, data?: {} }) => {
        if (data.success) {
          this.expenseform.reset();
          this.loadAllExpenses();
          this.msgService.add({
            key: "bc",
            severity: "success",
            summary: "Success",
            detail: data.message,
          });
        } else {
          this.msgService.add({
            key: "bc",
            severity: "error",
            summary: "Error",
            detail: data.message,
          });
        }
        this.isloading = false;
      },
      (error: any) => {
        this.msgService.add({
          key: "bc",
          severity: "error",
          summary: "Error",
          detail: error.error.message,
        });
        this.isloading = false;
      }
    );
  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.expenses[this.Eid]._id).subscribe(
      (data: { success?: boolean, message?: string, data?: {} }) => {
        if (data.success) {
          this.expenses = this.expenses.filter(
            (expense) => expense._id != this.expenses[this.Eid]._id
          );
          this.msgService.add({
            key: "bc",
            severity: "success",
            summary: "Success",
            detail: data.message,
          });
          console.log(data);
        } else {
          this.msgService.add({
            key: "bc",
            severity: "error",
            summary: "Error",
            detail: data.message,
          });
        }
      },
      (error: any) => {
        this.msgService.add({
          key: "bc",
          severity: "error",
          summary: "Error",
          detail: error.error.message,
        });
      }
    );
    this.closeDialog2();
  }

  updateExpense()
  {
    const expense = this.expenseUpdateform.value;
    expense._id = this.expenses[this.Eid]._id;
    expense.categoryId = expense.selectedCategory._id;

    this.expenseService.updateExpense(expense).subscribe(
      (data: { success?: boolean, message?: string, data?: {} }) => {
        if (data.success) {

          this.loadAllExpenses();

          this.msgService.add({
            key: "bc",
            severity: "success",
            summary: "Success",
            detail: data.message,
          });
          this.closeDialog2();
        } else {
          this.msgService.add({
            key: "bc",
            severity: "error",
            summary: "Error",
            detail: data.message,
          });
        }
      },
      (error: any) => {
        this.msgService.add({
          key: "bc",
          severity: "error",
          summary: "Error",
          detail: error.error.message,
        });
      }
    );
    this.closeDialog1();
  }

  changeEid(id: number): void {
    this.Eid = id;
  }

  showDialog1(id: number) {
    this.Eid = id;

    const categoryToSelect = this.categories?.find(category => category._id === this.expenses[id].categoryId._id);

    this.expenseUpdateform.setValue({
      amount: this.expenses[id].amount,
      description: this.expenses[id].description,
      date: new Date(this.expenses[id].date),
      selectedCategory: categoryToSelect,
    });

    this.expenseUpdateform.markAsPristine();

    this.visible1 = true;
  }

  closeDialog1() {
    this.visible1 = false;
  }

  showDialog2(id: number) {
    this.Eid = id;
    this.visible2 = true;
  }

  closeDialog2() {
    this.visible2 = false;
  }

  get amount() {
    return this.expenseform.get("amount");
  }

  get desc() {
    return this.expenseform.get("desc");
  }

  get date() {
    return this.expenseform.get("date");
  }

  get selectedCategory() {
    return this.expenseform.get("selectedCategory");
  }
}
