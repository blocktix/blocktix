import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Http } from '@angular/http';

import { Location } from './location.class';
import { IPositionError, IPosition, ICoordinates } from './location.interfaces';


/*
class IPositionError extends PositionError {
}
*/
/*
class PositionError implements IPositionError {
  readonly;
  get PERMISSION_DENIED(): number {return 1};
  get POSITION_UNAVAILABLE(): number {return 2};
  get TIMEOUT(): number {return 3};

  constructor(
    public code:number,
    public message:string) {
  }
}


interface Position {
    readonly coords: Coordinates;
    readonly timestamp: number;
}

declare var Position: {
    prototype: Position;
    new(): Position;
}
}*/



class PositionError implements IPositionError {
  readonly;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
  prototype: PositionError;

  constructor(
    public code:number,
    public message:string) {
    console.log('before');
    console.log(Object.getPrototypeOf(PositionError));
    console.log(Object.getPrototypeOf(this));
  }
}

PositionError.prototype.PERMISSION_DENIED = 1;
PositionError.prototype.POSITION_UNAVAILABLE = 2;
PositionError.prototype.TIMEOUT = 3;

class Position implements IPosition {
  readonly;

  constructor(
    public coords:Coordinates,
    public timestamp:number) {
  }
}

class Coordinates implements ICoordinates {
  null;
  readonly;

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
    this._position = Observable.create(observer => {

      this._observer = observer;

      if (navigator && navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position);
          },
          error => {
            if (error.code === error.POSITION_UNAVAILABLE)
              this.http
                .get('http://freegeoip.net/json/')
                .subscribe(
                  response => {
                    let coords: Coordinates = response.json();
                    coords = new Coordinates(coords.latitude, coords.longitude);
                    observer.next(<Position>new Position(coords, new Date().getTime()));
                  },
                  httperr => observer.error(error));
            else
              observer.error(error);
          });
      else
        observer.error(new PositionError(0, 'Browser does not support location services'));
    }).publishReplay(1).refCount();

    //this._position.publishLast().refCount();
  }

  getPosition(): Observable<Position> {

    return this._position;
  }

  setPosition(latitude: number, longitude: number) {
    this._observer.next(
      new Position(
        new Coordinates(latitude, longitude),
        new Date().getTime()));
  }
}
