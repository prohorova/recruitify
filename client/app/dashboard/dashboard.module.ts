import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { InviteService } from './services/invite.service';
import { ReviewsService } from './services/reviews.service';
import { StatisticsService } from './services/statistics.service';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InviteFormComponent } from './invite/invite-form/invite-form.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { BulkInviteComponent } from './invite/bulk-invite/bulk-invite.component';
import { InviteComponent } from './invite/invite.component';
import { CustomersComponent } from './customers/customers.component';
import { InviteListComponent } from './invite/bulk-invite/invite-list/invite-list.component';
import { ChartComponent } from './statistics/chart/chart.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes),
    ChartsModule
  ],
  exports: [ DashboardComponent ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    InviteFormComponent,
    StatisticsComponent,
    ReviewsComponent,
    BulkInviteComponent,
    InviteComponent,
    CustomersComponent,
    InviteListComponent,
    ChartComponent
  ],
  providers: [ InviteService, ReviewsService, StatisticsService ],
  entryComponents: [ InviteListComponent ]
})

export class DashboardModule {
}
