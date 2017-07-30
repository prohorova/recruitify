export const appRoutes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'auth', loadChildren: './user/user.module#UserModule' },
  { path: '', pathMatch: 'full', redirectTo: 'auth'},
  { path: '**', pathMatch: 'full', redirectTo: 'auth'}
];
