import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(data) {
    this.loading = true;
    this.userService.requestPasswordReset(data)
      .subscribe(res => {
        this.loading = false;

        this.forgotPasswordForm.controls['email'].setValue(null);

        this.dialog.open(DialogComponent, {
          data: {
            title: 'Forgot password success',
            message: res.message
          }
        })
      }, err => {
        this.loading = false;
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Forgot password failure',
            message: err.message
          }
        })
      })
  }

}
