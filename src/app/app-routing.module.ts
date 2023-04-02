import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ServersComponent } from './components/servers/servers.component';
import { AuthGuard } from './security/auth.guard';
import { SystemUserComponent } from './components/system-user/system-user.component';
import { UserComponent } from './components/user/user.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { JobComponent } from './components/job/job.component';
import { ApplicationComponent } from './components/application/application.component';
import { HasRoleGuard } from './security/has-role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'servers',
    component: ServersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN'],
    },
  },
  {
    path: 'configs',
    component: ConfigurationComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN'],
    },
  },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'system-users',
    component: SystemUserComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN'],
    },
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN','ROLE_GDHB'],
    },
  },
  {
    path: 'profiles',
    component: ProfileComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN'],
    },
  },
  {
    path: 'transfers',
    component: TransferComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN','ROLE_TRANSFER','ROLE_SUPERVISION'],
    },
  },
  {
    path: 'jobs',
    component: JobComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN'],
    },
  },
  {
    path: 'applications',
    component: ApplicationComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      authorities: ['ROLE_ADMIN'],
    },
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
