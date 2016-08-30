import { Routes, RouterModule } from '@angular/router';
import { eventsRoutes } from './events';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

// AngularClass
// import { provideWebpack } from '@angularclass/webpack-toolkit';
// import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  ...eventsRoutes,
  { path: '**',    component: NoContent },
];
