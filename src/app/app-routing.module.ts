import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ServersComponent } from './components/servers/servers.component';
import { AuthGuard } from './security/auth.guard';
import { SystemUserComponent } from './components/system-user/system-user.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { JobComponent } from './components/job/job.component';
import { ApplicationComponent } from './components/application/application.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'servers', component: ServersComponent, canActivate: [AuthGuard]},
  //{path: 'user', component: BoardUserComponent},
  {path: 'configs', component: ConfigurationComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent},
  {path: 'system-users', component: SystemUserComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'profiles', component: ProfileComponent, canActivate: [AuthGuard]},
  //{path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'transfers', component: TransferComponent, canActivate: [AuthGuard]},
  {path: 'jobs', component: JobComponent, canActivate: [AuthGuard]},
  {path: 'applications', component: ApplicationComponent, canActivate: [AuthGuard]},


  {path: '', redirectTo: 'login',pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
