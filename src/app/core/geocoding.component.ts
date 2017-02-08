import { Component, Output, EventEmitter } from '@angular/core'; 
import { FormControl } from '@angular/forms'; 
import { GeocodingService } from './geocoding.service';
import { Place } from './geocoding.service';
import { Location } from '.';

@Component({
  selector: 'geocoder',  
  providers: [GeocodingService],
  styleUrls: ['geocoder.style.css'],
  template: `

  <div>
    <input type="text" [formControl]="term" class="geocoder-address"/>
    <div class="geocoder-results">
      <ul class="geocoder-results-list">
        <li *ngFor="let place of places" (click)="addressSelect(place)">{{place.display_name}}</li>
        <li class="geocoder-licence" *ngIf="places && places.length > 1">{{places[1].licence}}</li>
      </ul>
    </div>
  </div>

  `
})
export class GeocodingComponent {
  @Output() addressSelectedEvent = new EventEmitter();

  private places: Place[];
  private term : FormControl;
  private address : string;
  private populatedBySelect = false;

  constructor(public service: GeocodingService) {
      this.term = new FormControl();
      this.term.valueChanges
               .debounceTime(500)
               .distinctUntilChanged()
               .subscribe(term => 
               {
                 if (this.populatedBySelect) {
                   this.populatedBySelect = false;
                   return;
                 }

                 this.service.getAddresses(term).subscribe(
                    places => {this.places = places},
                    error => console.error(error)
                  );
               });
  }

  addressSelect(place :Place) {
    this.term.setValue(place.display_name);
    this.populatedBySelect = true;
    this.addressSelectedEvent
        .emit(new Location(
                place.display_name, 
                [
                  Number(place.lat),
                  Number(place.lon)
                ]
            ));
    this.places = [];
  }
}
