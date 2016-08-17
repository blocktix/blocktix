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
  <template [ngIf]="event">
    <header>

      <span class="heading">{{ event.name }}</span>

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
    </header>

    <article>

      <div class="event-content">
        <div class="event-image"><!-- TODO: Event Image -->
          <img src="assets/img/event-blank.png" width="32px" height="32px" />
        </div>

        <div class="event-details">
          <div class="event-name"><label>Event:</label> {{ event.name }}</div>
          <div class="event-website"><label>Website:</label> {{ event?.website }}</div>
          <div class="event-description">{{ event.description }}</div>
          <div class="event-tags"><!-- TODO: Tags -->
            <button>BEER</button>
            <button>EXPO</button>
          </div>
        </div>

      </div>

      <div class="event-tickets-header">
        <div class="heading">Tickets</div>

        <div class="ticket-filter">
          <label><input type="checkbox"> Show sold out tickets</label>
          <label><input type="checkbox"> Show unavailable tickets</label>
        </div>
      </div>

      <div class="event-ticket-row">
        <div>
          <div><label>Description:</label> Early bird ticket</div>
          <div><label>Availability:</label> 5/1000 Remaining</div>
          <div><label>Price:</label> 5 ETH</div>
        </div>
        <div>
          <button>buy</button>
          <input type="number" min="1" max="1000" value="1" />
          <label>Total:</label> 10 ETH
          <button>Request Refund</button>
          <input type="number" min="1" max="1000" value="1" />
          <label>Own:</label> 5
        </div>
      </div>

    </article>

    <aside>
    </aside>

  </template>
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
