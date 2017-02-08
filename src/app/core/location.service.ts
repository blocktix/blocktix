import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Http } from '@angular/http';

import { Location } from './location.class';
import { IPositionError, IPosition, ICoordinates } from './location.interfaces';


class PositionError implements IPositionError {
  readonly;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
  prototype: PositionError;

  constructor(
    public code:number,
    public message:string) {
  }
}

PositionError.prototype.PERMISSION_DENIED = 1;
PositionError.prototype.POSITION_UNAVAILABLE = 2;
PositionError.prototype.TIMEOUT = 3;

class Position implements IPosition {


  constructor(
    public coords:Coordinates,
    public timestamp:number) {
  }
}

class Coordinates implements ICoordinates {

  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;

  constructor(
    public latitude: number,
    public longitude: number) {

  }
}

@Injectable()
export class LocationService {
  private _position: Observable<Position>;
  private _observer: Observer<Position>;
  private _lastPosition: Position;

  constructor(
    private http: Http) {
    // we only need to initialize this once, as it is a shared observable...
    this._position = Observable.create(observer => this._observer = observer).publishReplay(1).refCount();
    this._position.subscribe().unsubscribe(); // Kick it off, since its shared... We should look at a more functional approach in the future
  }

  locate(): void {
    localStorage.removeItem('storedLocation');

    if (navigator && navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        position => {
          this._observer.next(position);
        },
        error => {
          if (error.code === error.POSITION_UNAVAILABLE)
            this.http
              .get('http://freegeoip.net/json/')
              .subscribe(
                response => {
                  let coords: Coordinates = response.json();
                  coords = new Coordinates(coords.latitude, coords.longitude);
                  this._observer.next(<Position>new Position(coords, new Date().getTime()));
                },
                httperr => this._observer.error(error));
          else
            this._observer.error(error);
        });
    else
      this._observer.error(new PositionError(0, 'Browser does not support location services'));
  }

  getPosition(): Observable<Position> {
    console.log(localStorage.getItem('storedLocation'));
    if (localStorage && localStorage.getItem('storedLocation'))
      setTimeout(_ => this._observer.next(JSON.parse(localStorage.getItem('storedLocation'))));
    else
      this.locate();

    return this._position;
  }

  setPosition(position: any, longitude?: number): void {
    if (typeof position === "number")
      position = new Position(
        new Coordinates(position, longitude),
        new Date().getTime());

    localStorage.setItem('storedLocation', JSON.stringify(position));

    this._observer.next(position);
  }
}
