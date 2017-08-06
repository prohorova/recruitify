import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

  @Input() control: FormControl;

  scale = _.range(1, 11, 1);

  constructor() { }

  ngOnInit() {
  }

}
