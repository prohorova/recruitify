import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class UnauthGuardService implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) { }

  canActivate() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    return true;
  }

}
