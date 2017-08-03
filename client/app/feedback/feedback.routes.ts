import { FeedbackComponent } from './feedback.component';

export const feedbackRoutes = [
  { path: ':customerId', component: FeedbackComponent },
  { path: '', component: FeedbackComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
