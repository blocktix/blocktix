import { Component, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { Location } from '../core/location.class';

import 'leaflet';

/*
 * Map Component
 */
@Component({
  selector: 'leaflet-map',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../node_modules/leaflet/dist/leaflet.css', 'map.style.css'],
  template: ``
})
export class MapComponent {
  @Input() location: Location;
  @Input() draggable: boolean = false;
  @Input() markerCallback: (latLng: L.LatLng) => void;

  private prevLocation: L.LatLng;
  public locationMarker: L.Marker;

  public static icon: L.Icon = L.icon({
    iconUrl: '../../assets/img/event-location.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  public map: L.Map;
  public attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  constructor(
    private _element: ElementRef) {
  }

  ngOnInit() {
    this.prevLocation = L.latLng(this.location ? this.location.coordinates : [1.1, 1.1]);

    this.map = L.map(this._element.nativeElement, <L.Map.MapOptions>{
      /*zoomControl: false,*/
      center: this.prevLocation,
      zoom: (this.location ? 14 : 4),
      minZoom: 4,
      maxZoom: 17,
      layers: [
        new L.TileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: this.attribution
        })]
    });

    this.updateLocationMarker();

    //this.map.locate({setView: true, maxZoom: 16});
  }

  ngDoCheck() {

    if(this.location && !(
        this.locationMarker && (
          this.locationMarker.dragging ||
          this.locationMarker.getLatLng().equals(this.location.coordinates)))) {

      this.map
        .setView(this.location.coordinates, 10, {animate: true});

      this.updateLocationMarker();
    }
  }

  updateLocationMarker() {

    if (!this.location)
      return;

    if (this.locationMarker)
      this.locationMarker.setLatLng(this.location.coordinates);
    else
      this.locationMarker =
        L.marker(this.location.coordinates, {icon: MapComponent.icon, draggable: this.draggable})
          .addTo(this.map)
          .on('dragend', function(event) {
            if (this.markerCallback)
              this.markerCallback(event.target.getLatLng());
          }, this);

    if (this.draggable)
      this.locationMarker.bindPopup('Click and drag to update location...').openPopup();
  }

}
