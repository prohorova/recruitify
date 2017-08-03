import { AuthGuardService } from './core/auth-guard/auth-guard.service';
import { UnauthGuardService } from './core/unauth-guard/unauth-guard.service';

export const appRoutes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [ AuthGuardService ]},
  { path: 'auth', loadChildren: './user/user.module#UserModule', canActivate: [ UnauthGuardService ] },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule' },
  { path: '', pathMatch: 'full', redirectTo: 'auth'},
  { path: '**', pathMatch: 'full', redirectTo: 'auth'}
];
