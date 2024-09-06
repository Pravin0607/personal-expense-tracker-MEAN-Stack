import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarModule } from 'primeng/sidebar';
import { StoreModule } from '@ngrx/store';
import { DashboardhomeComponent } from './components/dashboardhome/dashboardhome.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { CategoryComponent } from './components/category/category.component';
import { ReportComponent } from './components/report/report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChartModule } from 'primeng/chart';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { EditexpenseComponent } from './components/editexpense/editexpense.component';
import { TabViewModule } from 'primeng/tabview';
import { DaywiseComponent } from './components/report/subreports/daywise/daywise.component';
import { MonthwiseComponent } from './components/report/subreports/monthwise/monthwise.component';
import { YearwiseComponent } from './components/report/subreports/yearwise/yearwise.component';
import { BetweenDatesComponent } from './components/report/subreports/between-dates/between-dates.component';
import { PiechartComponent } from './components/piechart/piechart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    DashboardComponent,
    DashboardhomeComponent,
    ExpenseComponent,
    CategoryComponent,
    ReportComponent,
    ProfileComponent,
    EditexpenseComponent,
    DaywiseComponent,
    MonthwiseComponent,
    YearwiseComponent,
    BetweenDatesComponent,
    PiechartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    SidebarModule,
    ChartModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    DialogModule,
    TabViewModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
