import { Component } from '@angular/core';
import { LocationService } from './location.service';
import { Location } from './location.class';
import { MapComponent } from '../leaflet/map.component';

@Component({
  selector: 'location',  // <location></location>
  //styleUrls: ['event-detail.style.css'],
  directives: [MapComponent],
  template: `
    <leaflet-map [location]="location" draggable="true" [markerCallback]="updateLocation.bind(this)"></leaflet-map>
  `
})
export class LocationComponent {
  public static pageTitle = 'My Location';

  private location: Location;

  constructor(
    public locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.getPosition()
      .subscribe(position => {
        this.location = new Location('', [position.coords.latitude, position.coords.longitude]);
      });
  }

  ngOnDestroy() {

  }

  updateLocation(latLng: L.LatLng): void {
    this.locationService.setPosition(latLng.lat, latLng.lng);
  }
}
