import { Component, OnInit } from '@angular/core';
import { InviteService } from '../services/invite.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any[];

  constructor(private inviteService: InviteService) { }

  ngOnInit() {
    this.inviteService.getCustomers()
      .subscribe(res => {
        this.customers = res;
      })
  }

}
