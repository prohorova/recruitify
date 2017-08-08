import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input('score') score = 0;

  pieChartLabels:string[] = ['', 'Your overall score'];
  pieChartData:number[] = [this.score, 10 - this.score];
  pieChartType:string = 'pie';
  legend = false;
  options = {
    tooltips: {
      enabled: false
    }
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.pieChartData = [this.score, 10 - this.score];
  }


}
