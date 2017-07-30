import { NgModule } from '@angular/core';

import { AuthModule } from '../auth/auth.module';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { UnauthGuardService } from './unauth-guard/unauth-guard.service';
import { UserService } from './user/user.service';
import { AuthService } from "./auth/auth.service";

@NgModule({
  imports: [ AuthModule ],
  providers: [ AuthGuardService, UnauthGuardService, UserService, AuthService ]
})

export class CoreModule {
}
