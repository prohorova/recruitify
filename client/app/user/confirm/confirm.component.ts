import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { UserService } from '../../core/user/user.service';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  loading = false;
  token: string;
  sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/login']);
      }
      this.userService.confirm(this.token)
        .subscribe((data) => {
          this.loading = false;
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Verification success',
              message: data.message
            }
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        }, err => {
          this.loading = false;
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Verification failure',
              message: err.message || 'An error occurred'
            }
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        })
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
