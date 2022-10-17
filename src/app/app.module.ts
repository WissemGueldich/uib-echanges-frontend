import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";


import { AppComponent } from './app.component';
import { ListInvoicesComponent } from './components/list-invoices/list-invoices.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ServersComponent } from './components/servers/servers/servers.component';


const routers: Routes = [
  {path: 'invoices', component: ListInvoicesComponent},
  {path: 'addinvoice', component: AddInvoiceComponent},
  {path: 'editinvoice/:id', component: AddInvoiceComponent},

  
  {path: '', redirectTo: '/invoices', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ListInvoicesComponent,
    AddInvoiceComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
    AppRoutingModule
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }