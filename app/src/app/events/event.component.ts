import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { EventsService, Event } from './events.service';
import { MapComponent } from '../core';
import { LocationService } from '../core';
import { Location } from '../core';

@Component({
  selector: 'event',  // <event></event>
  providers: [EventsService],
  styleUrls: ['event.style.css'],
  template: `

    <header>
      <span class="heading">{{heading}}</span>
    </header>

    <form (ngSubmit)="onCreateEvent()"> 
      <div class="event-form">
        <div class="event-form-row form-border-bottom">
          <label class="col-2">ORGANISER:</label>
          <div class="event-form-input col-10">
          <img class="event-organiser-icon" src="assets/img/event-organiser.png">
            <span>3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC</span>
          </div>
        </div>
        <div class="event-form-row form-border-bottom">
          <label class="col-2">EVENT NAME:</label>
          <div class="event-form-input col-10">
            <input 
              name="name" 
              type="text" 
              ngControl="name" 
              [(ngModel)]="event.name" 
              required
            >
          </div>
        </div>
        <div class="event-form-row form-border-bottom">
          <label class="col-2">EVENT DESCRIPTION:</label>
          <div class="event-form-input col-10">
            <textarea
              rows="5"
              name="description" 
              type="text"  
              ngControl="description" 
              [(ngModel)]="event.description"
            ></textarea>
          </div>
        </div>

        <div class="event-form-row form-border-bottom">
          <label class="col-2">ADDRESS:</label>
          <div class="event-form-input col-10">
            <geocoder (addressSelectedEvent)="onGeocoderAddressSelect($event);"></geocoder>
          </div>
        </div>

        <div class="event-map form-border-bottom">
          <leaflet-map [location]="event.location" [draggable]="true" [markerCallback]="markerCallback"></leaflet-map>
        </div>  

        <div class="event-form-row form-border-bottom">
          <label class="col-2">EVENT START DATE / TIME:</label>
          <div class="event-form-input col-10">
            <input 
              name="start-datetime" 
              type="datetime-local"
              ngControl="start-datetime" 
              [(ngModel)]="event.startDatetime"
            />
          </div>
        </div>
        <div class="event-form-row form-border-bottom">
          <label class="col-2">EVENT END DATE / TIME:</label>
          <div class="event-form-input col-10">
            <input 
              name="end-datetime" 
              type="datetime-local"
              ngControl="end-datetime" 
              [(ngModel)]="event.endDatetime"
            />
          </div>
        </div>
        <div class="event-form-row">
          <div class="event-form-buttons">
            <button type="submit">Create</button>
            <button type="button" (click)="onCancel()">Cancel</button>
          </div>
        </div>
      </div>
    </form>

  `
})
export class EventComponent {
  @ViewChild(MapComponent) mapComponent :MapComponent

  public static pageTitle = 'Event';

  private sub: Subscription;
  private event: Event;
  private mode: string;
  private heading: string;
  private locationerror: PositionError;

  private addresses = {};

  constructor(
    public locationService: LocationService,
    public service: EventsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    // Create a new event
    this.event = new Event(1, "", 1, "", null,  1, 1, null, null);

    this.locationService.getPosition()
      .subscribe(
        position => {
         // the events location to the current location 
         this.event.location = {
           address: '', 
           coordinates: [
             position.coords.latitude, 
             position.coords.longitude
             ]
           };
       },
        error => this.locationerror = error
      );

    this.sub = this.route.params.subscribe(params => {
      this.mode = params['mode']; 
      this.heading = this.mode[0].toUpperCase() + this.mode.slice(1) + ' ' + EventComponent.pageTitle;
     });

  }

  updateLocation() {
    this.mapComponent.location = this.event.location;
    this.mapComponent.updateLocationMarker();
  }

  onGeocoderAddressSelect($event :Location) {
    this.event.location = $event;
    this.updateLocation();
  }

  onCreateEvent() {
    this.service.createEvent(this.event);
  }

  onCancel() {
    this.router.navigate(['/events']);
  }

  markerCallback(lonLat : any) {
    this.event.location.coordinates = [lonLat.lat, lonLat.lng];
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}
