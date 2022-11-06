import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ServersComponent } from './components/servers/servers.component';
import { ServerModal } from './components/servers/modals/server-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './security/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfigModal } from './components/configuration/modals/config-modal.component';
import { SystemUserComponent } from './components/system-user/system-user.component';
import { SystemUserModalComponent } from './components/system-user/modals/system-user-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserComponent } from './components/user/user.component';
import { ProfileModalComponent } from './components/profile/profile-modal/profile-modal.component';
import { RoleComponent } from './components/role/role.component';
import { RoleModalComponent } from './components/role/role-modal/role-modal.component';
import { UserModalComponent } from './components/user/user-modal/user-modal.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TransferModalComponent } from './components/transfer/transfer-modal/transfer-modal.component';
import { JobComponent } from './components/job/job.component';
import { ApplicationComponent } from './components/application/application.component';
import { HomeComponent } from './components/home/home.component';
import { JobModalComponent } from './components/job/job-modal/job-modal.component';
import { ApplicationModalComponent } from './components/application/application-modal/application-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ServersComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ConfigurationComponent,
    SettingsComponent,
    ServerModal,
    NavbarComponent,
    ConfigModal,
    SystemUserComponent,
    SystemUserModalComponent,
    UserComponent,
    ProfileModalComponent,
    RoleComponent,
    RoleModalComponent,
    UserModalComponent,
    TransferComponent,
    TransferModalComponent,
    JobComponent,
    ApplicationComponent,
    HomeComponent,
    JobModalComponent,
    ApplicationModalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot()
    
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
