import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { feedbackRoutes } from './feedback.routes';
import { FeedbackComponent } from './feedback.component';
import { FeedbackService } from './services/feedback.service';
import { LikertComponent } from './likert/likert.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(feedbackRoutes)
  ],
  exports: [ FeedbackComponent ],
  declarations: [ FeedbackComponent, LikertComponent ],
  providers: [ FeedbackService ]
})

export class FeedbackModule {
}
