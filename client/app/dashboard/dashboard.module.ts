import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
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
    InviteListComponent
  ],
  providers: [ InviteService, ReviewsService, StatisticsService ],
  entryComponents: [ InviteListComponent ]
})

export class DashboardModule {
}
