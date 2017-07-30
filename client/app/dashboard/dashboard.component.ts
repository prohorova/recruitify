import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  getName() {
    const user = this.auth.getUser();
    return user ? user.name : '';
  }

}
