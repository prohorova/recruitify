import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { userRoutes } from './user.routes';
import { ConfirmComponent } from './confirm/confirm.component';
import { UserComponent } from './user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ],
  exports: [ UserComponent ],
  declarations: [ LoginComponent, RegisterComponent, ConfirmComponent, UserComponent, ForgotPasswordComponent, ResetPasswordComponent ],
  providers: [ UserService ]
})

export class UserModule {
}
