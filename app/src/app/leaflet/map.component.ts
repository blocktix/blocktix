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

  public static icon: L.Icon = L.icon({
    iconUrl: '../../assets/img/event-location.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  public map: L.Map;
  public attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

  constructor(
    private _element: ElementRef) {
  }

  ngOnInit() {
    this.map = L.map(this._element.nativeElement, {
      /*zoomControl: false,*/
      center: L.latLng(this.location.coordinates),
      zoom: 14,
      minZoom: 3,
      maxZoom: 17,
      layers: [
        new L.TileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: this.attribution
        })]
    });

    L.marker(this.location.coordinates, {icon: MapComponent.icon}).addTo(this.map);

    this.map.locate({setView: true, maxZoom: 16});
  }
}
