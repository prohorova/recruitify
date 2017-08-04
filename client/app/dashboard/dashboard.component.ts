import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened: boolean;

  @ViewChild('sidenav') sidenav: MdSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidenav(event.target.innerWidth);
  }

  constructor() { }

  ngOnInit() {
    this.handleSidenav(window.innerWidth);
  }

  handleSidenav(width) {
    if (width < 800) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

}
