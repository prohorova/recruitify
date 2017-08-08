import { DashboardComponent } from "./dashboard.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { StatisticsComponent } from './statistics/statistics.component';
import { InviteComponent } from './invite/invite.component';
import { CustomersComponent } from './customers/customers.component';

export const dashboardRoutes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: StatisticsComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'invite', component: InviteComponent },
    { path: 'customers', component: CustomersComponent }
  ]}
];
