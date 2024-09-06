import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardhomeComponent } from './components/dashboardhome/dashboardhome.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { CategoryComponent } from './components/category/category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path:'login',
    title:'LogIn User',
    component:LoginComponent
  },
  {
    path:'register',
    title:'Register User',
    component:RegisterComponent
  },
  {
    path:'home',
    title:'Dashboard',
    // component:HomeComponent,
    component:DashboardComponent,
    canActivate:[authGuard],
    children:[
      {
        path:'',
        title:'Welcome Home',
        component:DashboardhomeComponent
      },
      {
        path:'expense',
        title:'Expense Management',
        component:ExpenseComponent
      },
      {
        path:'category',
        title:'Category Management',
        component:CategoryComponent
      },
      {
        path:'report',
        title:'Reports',
        component:ReportComponent
      },
      {
        path:'profile',
        title:'Profile Management',
        component:ProfileComponent
      }
    ]
  },
  // {
  //   path:'',
  //   redirectTo:'home',
  //   pathMatch:'full',

  // },
  {
    path:'',
    component:WelcomeComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
