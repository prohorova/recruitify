import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { InviteService } from '../../services/invite.service';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-invite-form',
  templateUrl: 'invite-form.component.html',
  styleUrls: ['invite-form.component.css']
})
export class InviteFormComponent implements OnInit {

  inviteForm: FormGroup;
  methods = ['Email', 'SMS'];
  loading = false;

  constructor(private fb: FormBuilder,
              private dialog: MdDialog,
              private inviteService: InviteService) { }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      name: ['', Validators.required],
      method: [this.methods[0], Validators.required],
      email: '',
      phone: ''
    });

    this.inviteForm.controls['method'].valueChanges.subscribe((val) => {
      if (val === this.methods[0]) {
        this.inviteForm.controls['email'].setValidators([Validators.required, Validators.email]);
        this.inviteForm.controls['phone'].setValue(null);
        this.inviteForm.controls['phone'].setValidators(null);
        this.inviteForm.controls['email'].updateValueAndValidity();
        this.inviteForm.controls['phone'].updateValueAndValidity();
      } else {
        this.inviteForm.controls['email'].setValue(null);
        this.inviteForm.controls['email'].setValidators(null);
        this.inviteForm.controls['phone'].setValidators(Validators.required);
        this.inviteForm.controls['email'].updateValueAndValidity();
        this.inviteForm.controls['phone'].updateValueAndValidity();
      }
    });

    this.inviteForm.controls['method'].setValue(this.methods[0]);
  }

  showField(method) {
    return this.inviteForm.controls['method'].value == method;
  }

  submit(data) {
    this.loading = true;
    this.inviteService.createInvitation(data)
      .subscribe(res => {
        this.loading = false;
        this.inviteForm.reset();

        this.inviteForm.controls['method'].setValue(this.methods[0]);

        this.dialog.open(DialogComponent, {
          data: {
            title: 'Invitation success',
            message: res.message
          }
        })
      }, err => {
        this.loading = false;
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Invitation failure',
            message: err.message || 'An error occurred'
          }
        })
      })
  }

}
