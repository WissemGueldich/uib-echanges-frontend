import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ServersComponent } from './components/servers/servers.component';
import { AuthGuard } from './security/auth.guard';
import { SystemUserComponent } from './components/system-user/system-user.component';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'servers', component: ServersComponent, canActivate: [AuthGuard]},
  {path: 'user', component: BoardUserComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'configs', component: ConfigurationComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent},
  {path: 'system-users', component: SystemUserComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'profiles', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'roles', component: RoleComponent, canActivate: [AuthGuard]},



  {path: '', redirectTo: 'login',pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
