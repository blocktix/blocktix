import { Injectable } from '@angular/core';
//import { HmrState } from 'angular2-hmr';
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
  private _position: Promise<Position>;

  constructor(
    private http: Http) {

    // we only need to initialize this once most likely...
    this._position = new Promise((resolve, reject) => {

          if (navigator && navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
              position => {
                resolve(position);
              },
              error => {
                if (error.code === error.POSITION_UNAVAILABLE)
                  this.http
                    .get('http://freegeoip.net/json/')
                    .subscribe(
                      response => {
                        let coords: Coordinates = response.json();
                        coords = new Coordinates(coords.latitude, coords.longitude);
                        resolve(<Position>new Position(coords, new Date().getTime()));
                      },
                      httperr => reject(error));
                else
                  reject(error);
              });
          else
            reject(new PositionError(0, 'Browser does not support location services'));
        });
  }

  getPosition(): Promise<Position> {
    return this._position;
  }

  setPosition(latitude: number, longitude: number) {
    this._position = Promise.resolve(
      new Position(
        new Coordinates(latitude, longitude),
        new Date().getTime()));
  }
}
