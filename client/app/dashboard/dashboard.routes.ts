import {DashboardComponent} from "./dashboard.component";
import { BoardComponent } from "./board/board.component";
import { ReviewsComponent } from "./reviews/reviews.component";

export const dashboardRoutes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: BoardComponent },
    { path: 'reviews', component: ReviewsComponent}
  ]}
];
