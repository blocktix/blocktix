import { LatLngExpression } from 'leaflet';

export class Location {
  constructor(
    public address: string,
    public coordinates: LatLngExpression) {
  }
}
