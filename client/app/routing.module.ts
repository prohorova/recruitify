import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './core/auth-guard/auth-guard.service';
import { UnauthGuardService } from './core/unauth-guard/unauth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    //canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [UnauthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    //canActivate: [UnauthGuardService]
  },
  {
    path: '**',
    component: DashboardComponent,
    //canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {
}
