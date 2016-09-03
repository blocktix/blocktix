import { Component, ElementRef, Input } from '@angular/core';
import { LocationService } from './location.service';
import { Location } from '../core/location.class';

// TODO: Set / Get unit type (Imperial / Metric)
// TODO: Set / Get location - users might want to manually set their location
@Component({
  selector: 'distance',
  template: `
    <template [ngIf]="distance"><ng-content></ng-content> {{ distance }}</template>
  `
})
export class DistanceComponent {
  @Input() location: Location;

  private mylocation: Position;
  private locateError: PositionError;
  private distance: string;

  constructor(
    private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.getPosition()

      .subscribe(
        position => {
          this.mylocation = position;
          this.distance = DistanceComponent.calculateDistance(
            this.location.coordinates[0],    this.location.coordinates[1],
            this.mylocation.coords.latitude, this.mylocation.coords.longitude).toFixed(2) + ' Km'
        },
        error => this.locateError = error);
  }

  static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    let dLon = lng2 - lng1,
        rad = 0.017453292519943295, // Math.PI / 180
        deg = 57.29577951308232, // 180 / Math.PI
        c = Math.cos,
        a = 0.5 - c((lat2 - lat1) * rad) / 2
          + c(lat1 * rad) * c(lat2 * rad)
          * (1 - c(dLon * rad))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // Distance = 2 * R; R = 6371 km
  }

}


