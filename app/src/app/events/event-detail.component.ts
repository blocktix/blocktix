import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../app.service';
import { EventsService, Event } from './events.service';

import { MapComponent } from '../core';
import { DistanceComponent } from '../core';


@Component({
  selector: 'event',  // <event></event>
  providers: [EventsService],
  styleUrls: ['event-detail.style.css'],
  //directives: [MapComponent, DistanceComponent],
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
          <span>{{ event.location.address }}<distance [location]="event.location">, </distance></span><!-- TODO: Calculate distance -->
        </div>
      </div>
    </header>

    <article>

      <leaflet-map [location]="event.location"></leaflet-map>

      <div class="event-content">
        <div class="event-image"><!-- TODO: Event Image -->
          <img src="assets/img/event-blank.svg" width="32px" height="32px" /><!-- TODO: Image size :? -->
        </div>

        <div class="event-details">
          <div class="event-name"><label>Event:</label> {{ event.name }}</div>
          <div class="event-website"><label>Website:</label> {{ event?.website }}</div>
          <div class="event-description">{{ event.description }}</div>
          <!--<div class="event-tags"><!-- TODO: Tags
            <button>BEER</button>
            <button>EXPO</button>
          </div>-->
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
        <div class="event-ticket-details">
          <div><label>Description:</label> Early bird ticket</div>
          <div><label>Availability:</label> 5/1000 Remaining</div>
          <div><label>Price:</label> 5 ETH</div>
        </div>
        <div class="event-ticket-buy">
          <button>buy</button>
          <input type="number" min="1" max="1000" value="1" />
          <label>Total:</label> 10 ETH
        </div>
        <div class="event-ticket-refund">
          <button>Request Refund</button>
          <input type="number" min="1" max="1000" value="1" />
          <label>Own:</label> 5
        </div>
      </div>

    </article>

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
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getEvent(id)
        .then(event => {
          this.event = event;

          this.appState.set('event-id', event.id);
        });
     });

  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
