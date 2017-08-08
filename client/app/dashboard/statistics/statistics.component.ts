import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  stats: any = {};

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.getStatistics()
      .subscribe(data => {
        this.stats = data;
      }, err => {

      });
  }

  getOverallScore() {
    return this.stats
      && this.stats.questions.reduce((sum, question) => sum + question.score, 0)/this.stats.questions.length;
  }

}
