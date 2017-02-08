import { EventListComponent }    from './event-list.component';
import { EventDetailComponent }  from './event-detail.component';
import { EventComponent }  from './event.component';

export const eventsRoutes = [
  { path: 'events',     component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'event/:mode', component: EventComponent },
];
