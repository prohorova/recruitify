import { NgModule } from '@angular/core';

import { AuthGuardService } from './auth-guard/auth-guard.service';
import { UnauthGuardService } from './unauth-guard/unauth-guard.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  providers: [ AuthGuardService, UnauthGuardService, AuthService ]
})

export class CoreModule {
}
