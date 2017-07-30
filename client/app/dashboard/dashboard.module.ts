import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [ DashboardComponent ],
  declarations: [ DashboardComponent ]
})

export class DashboardModule {
}
