import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  token: string;
  resetPasswordForm: FormGroup;
  loading = false;
  sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/login']);
      }
    });

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(data) {
    this.loading = true;
    this.userService.resetPassword({token: this.token, password: data.password})
      .subscribe(res => {
        this.loading = false;
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Reset password success',
            message: res.message
          }
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/auth']);
        })
      }, err => {
        this.loading = false;
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Reset password failure',
            message: err.message
          }
        })
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
