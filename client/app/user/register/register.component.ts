import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { UserService } from '../services/user.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
              private dialog: MdDialog,
              private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: '',
      email: ['',  Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      companyName: '',
      phone: ''
    })
  }

  submit(data) {
    this.loading = true;
    this.userService.register(data)
      .subscribe(res => {
          this.loading = false;
          this.registerForm.reset();

          this.dialog.open(DialogComponent, {
            data: {
              title: 'Registration successful',
              message: res.message
            }
          })
        },
        err => {
          this.loading = false;
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Registration failure',
              message: err.message || 'An error occurred'
            }
          })
        })
  }
}
