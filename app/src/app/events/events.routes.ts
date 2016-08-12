import { EventListComponent }    from './event-list.component';
import { EventDetailComponent }  from './event-detail.component';

export const eventsRoutes = [
  { path: 'events',     component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
];
