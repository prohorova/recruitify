import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { InviteService } from './services/invite.service';
import { ReviewsService } from './services/reviews.service';
import { StatisticsService } from './services/statistics.service';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardComponent } from './board/board.component';
import { InviteFormComponent } from './board/invite-form/invite-form.component';
import { StatisticsComponent } from './board/statistics/statistics.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [ DashboardComponent ],
  declarations: [ DashboardComponent, ProfileComponent, BoardComponent, InviteFormComponent, StatisticsComponent,
    ReviewsComponent ],
  providers: [ InviteService, ReviewsService, StatisticsService ]
})

export class DashboardModule {
}
