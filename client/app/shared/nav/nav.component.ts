import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }

  // showToggleButton() {
  //   return this.router.url.indexOf('dashboard') !== -1;
  // }
}
