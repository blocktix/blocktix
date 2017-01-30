import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { EventsService, Event } from './events.service';

@Component({
  selector: 'events',  // <events></events>
  providers: [EventsService],
  styleUrls: [ './event-list.style.css' ],
  template: `

    <header>

      <span class="heading">Events</span>

      <button [routerLink]=" [ '/event', 'create' ] " class="create-event"><span class="icon-plus">Create Event</span></button>

  <template [ngIf]="events"><!-- conditionally create this section based on there being events or not -->

      <span class="sort-events">
        <label class="icon-angle-down">
          <i class="separator"></i>
          <select [(ngModel)]="sortProp" (ngModelChange)="onSort()">
            <option value="id" selected>Sort</option>
            <option value="name">Name</option>
            <option value="startTime">Date</option>
            <option value="distance">Distance</option>
            <option value="location">Location</option>
          </select>
          <i class="sort-direction {{ sortClass }}" (click)="onSort()"></i>
        </label>

      </span>

  </template>

    </header>
    <article>

  <template [ngIf]="events"><!-- conditionally create this section based on there being events or not -->

      <div *ngFor="let event of events | orderBy : [sortDown + sortProp] " class="event-row" (click)="onSelectEvent(event);" [ngClass]="{selected: selectedId === event.id }">
        <div class="event-image"><!-- TODO: Event Image -->
          <img src="assets/img/event-blank.svg" width="32px" height="32px" /><!-- TODO: Image sizes :? -->
        </div>
        <div class="event-details">
          <div class="event-name">{{ event.name }}</div>
          <div class="event-description">{{ event.description }}</div>
          <div class="event-tags"><!-- TODO: Tags -->
            <a>BEER</a>
            <a>EXPO</a>
          </div>
        </div>
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
      </div>

  </template>

  <template [ngIf]="!events"><!-- conditionally create this section based on there being events or not -->
    <div class="event-row event-details" [routerLink]=" ['/events', 'create' ] ">
      There are currently no events...
    </div>
  </template>

    </article>
  `
})
export class EventListComponent {

  public static pageTitle = 'Events'; // TODO: Translations?

  private selectedId: number;
  private sortProp: string = 'id';
  private sortDown: string = '';
  private sortClass: string = 'icon-sort';

  events: Event[];

  constructor(
    public appState: AppState,
    public service: EventsService,
    private router: Router) {
  }

  ngOnInit() {
    this.selectedId = +this.appState.get('event-id');

    this.service.getEvents()
      .then(events => this.events = events);
  }

  onSelectEvent(event: Event) {
    this.appState.set('event-id', event.id);
    this.router.navigate(['/events', event.id]);
  }

  onSort() {
    let sortClass = '';

    switch(this.sortProp) {
      case 'name':      sortClass = 'icon-sort-name'; break;
      case 'startTime': sortClass = 'icon-sort-number'; break;
      case 'distance':  sortClass = 'icon-sort-alt'; break;
      case 'location':  sortClass = 'icon-sort-alt'; break;
    }

    this.sortClass = sortClass ? (sortClass + (this.sortClass.indexOf('-up') == -1 ? '-up' : '-down')) : 'icon-sort';

    this.sortDown = ((sortClass && this.sortClass.indexOf('-down') == -1) || this.sortDown === '-' ? '' : '-');

    console.log('grrr', this.sortProp, sortClass);
  }

}
