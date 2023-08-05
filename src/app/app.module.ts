import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TransferSupervisionComponent } from './components/transfer-supervision/transfer-supervision.component';
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
import { JobComponent } from './components/job/job.component';
import { ApplicationComponent } from './components/application/application.component';
import { HomeComponent } from './components/home/home.component';
import { JobModalComponent } from './components/job/job-modal/job-modal.component';
import { ApplicationModalComponent } from './components/application/application-modal/application-modal.component';
import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { HasRoleGuard } from './security/has-role.guard';
import { TransferSupervisionModalComponent } from './components/transfer-supervision/transfer-supervision-modal/transfer-supervision-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ServersComponent,
    BodyComponent,
    SidenavComponent,
    ConfigurationComponent,
    TransferSupervisionComponent,
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
    JobComponent,
    ApplicationComponent,
    HomeComponent,
    JobModalComponent,
    ApplicationModalComponent,
    SimpleModalComponent,
    TransferSupervisionModalComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2SearchPipeModule
    
  ],
  providers: [authInterceptorProviders, AuthGuard,HasRoleGuard,SortPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
