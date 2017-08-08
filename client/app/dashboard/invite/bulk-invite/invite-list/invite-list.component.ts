import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { InviteService } from '../../../services/invite.service';

@Component({
  selector: 'app-invite-list',
  templateUrl: 'invite-list.component.html',
  styleUrls: ['invite-list.component.css']
})
export class InviteListComponent implements OnInit {

  submitted = false;
  message: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              private inviteService: InviteService) { }

  ngOnInit() {
  }

  invite() {
    this.submitted = true;
    this.inviteService.createInvitation(this.data.customers)
      .subscribe(res => {
        this.message = res.message;
      }, err => {
        this.message = err.message;
      })
  }

}
