import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { EventsService, Event } from './events.service';

@Component({
  selector: 'event',  // <event></event>
  providers: [EventsService],
  styleUrls: ['./event-detail.style.css'],
  template: `
  <div class="event-container" *ngIf="event">
    <header>

      <h1>{{ event.name }}</h1>
      <h6>{{ event.description }}</h6>

    </header>
    <article>

        <div class="event-row">
            <div class="event-image"><!-- TODO: Event Image -->
              <img src="assets/img/event-blank.png" />
            </div>
            <div class="event-details">
              <div class="event-name">{{ event.name }}</div>
              <div class="event-description">{{ event.description }}</div>
              <div class="event-tags"><!-- TODO: Tags -->
                <button>BEER</button>
                <button>EXPO</button>
              </div>
            </div>
            <div class="event-meta">
              <div class="event-start-datetime">
                <label>Event Starts</label>
                <span>{{ event.startTime | date }}</span>
              </div>
              <div class="event-location">
                <label>Location</label>
                <span>{{ event.location }}, 3.2Km</span><!-- TODO: Calculate distance -->
              </div>
            </div>
        </div>

    </article>

  </div>
  `
})
export class EventDetailComponent {
  public static pageTitle = 'Event';

  private sub: Subscription;

  event: Event;

  constructor(
    public appState: AppState,
    public service: EventsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getEvent(id)
         .then(event => this.event = event);
     });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
