import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from './location.service';
import { Location } from './location.class';


@Component({
  selector: 'location',  // <location></location>
  template: `
    <leaflet-map [location]="location" draggable="true" [markerCallback]="updateLocation.bind(this)">
    </leaflet-map>
  `
})
export class LocationComponent {
  public static pageTitle = 'My Location';
  private sub: Subscription;

  private location: Location;

  constructor(
    public locationService: LocationService) {
  }

  ngOnInit() {
    this.sub = this.locationService.getPosition()
      .subscribe(position => {
        this.location = new Location('', [position.coords.latitude, position.coords.longitude]);
      },
      error => {console.log(error); alert('double click map to set location...')}); // TODO: Handle error
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateLocation(latLng: L.LatLng): void {
    // TODO: Do you want to save location?
    this.locationService.setPosition(latLng.lat, latLng.lng);
  }
}
