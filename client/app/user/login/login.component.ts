import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { UserService } from '../services/user.service';
import { AuthService } from '../../core/auth/auth.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private dialog: MdDialog,
              private userService: UserService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',  Validators.required],
      password: ['', Validators.required],
    })
  }

  submit(data) {
    this.loading = true;
    this.userService.login(data)
      .subscribe((res: any) => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.loading = false;
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Login failure',
              message: err.message || 'An error occurred'
            }
          })
        })
  }
}
