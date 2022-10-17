import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { ListInvoicesComponent } from './components/list-invoices/list-invoices.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { ServersComponent } from './components/servers/servers/servers.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  {path: 'invoices', component: ListInvoicesComponent},
  {path: 'addinvoice', component: AddInvoiceComponent},
  {path: 'editinvoice/:id', component: AddInvoiceComponent},


  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }