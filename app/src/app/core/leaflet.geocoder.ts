import { EventEmitter } from '@angular/core';
import { Location } from '.';

import 'leaflet';

const ICON_DATA = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAchJREFUOI2VkL+LE1EQxz8zu8HCwgTEw0KTffsODpQDra5QBH+AYnsg2NvaCorYqIVgY3XgHyBYxztLRUWwELQxmmwSr7KRFGoRzM6z2V2SNSf4rebLzPfz5o2wREmSrIjIMRFpqGq/3+8Pl80ByLxJ0/Qk8AA4W+t9NLObo9HoWR0QlYX3ftPMtkVktQ4GVkTkaqvVYjKZvPxrgyRJ1oF3qrrPzKaq+khVu8DUzE6b2Q1VPVhkrmRZ9nQBkKZpF7hsZr+jKLowGAwWXul0Ou0oit4Ch4HdLMsckAOoc+4AcLGY3aqHAcbj8dcQwq3CHnXObZQ9jaJorbyFiOzUw6Vms9nzOXu8AphZdcgQwmwvQBzH+dycVoBGo/EZCACqem4vAFD1VPVTVfd6ve9m9qLw1733J+pJ59whEblf2G/NZvNN2RMA7/1GCOE1EJnZDxG5JyJdYCoiZ/I8v6OqR4rM3SzLbi8AANI0vQZsAdX/limE8CuEcGk0Gr1ifjjLssfAeeDDktxuCOGhmc1EZD+w7Zw7tbDBvNrt9locx+tmFovIl+Fw+B4w7/1mnudPVDU2s59mtroU8C+VEMBU1f9vvtowTVMP8AcMGqmRL80SEgAAAABJRU5ErkJggg==`;

/*
 * Leaflet Geocoder
 */
export class Geocoder extends L.Control {

  public options = {
        position: 'topleft'
    };

  public toggled: boolean = false;
  private _geocoder :any; 
  private _input :any; 
  private _search :any; 
  private _results :any;
  private _controls : any;
  private _map : L.Map;

  public searchEvent: EventEmitter;
  public moveLocationEvent: EventEmitter;

  constructor() {
    super();
    this.searchEvent = new EventEmitter();
    this.moveLocationEvent = new EventEmitter();
  }

  onAdd(map :L.Map) {

    this._map = map;
    this._geocoder = L.DomUtil.create('div', '', null);
    this._controls = L.DomUtil.create('div', 'leaflet-bar leaflet-geocoder', this._geocoder);
    this._input = L.DomUtil.create('input', 'leaflet-geocoder-input leaflet-geocoder-toggle-on', this._controls);
    this._search = L.DomUtil.create('img', 'leaflet-geocoder-search', this._controls);
    this._results = L.DomUtil.create('ul', 'leaflet-bar leaflet-geocoder-results', this._geocoder);

    this.toggle();

    this._search.setAttribute('src', ICON_DATA);

    L.DomEvent
      .addListener(this._search, 'click', this.toggle, this)
      .addListener(this._input, 'keypress', this._keyPress, this);

    return this._geocoder;
  }

  _keyPress(evt: any) {
    
    if (evt.code != 'Enter')
      return;

    let place = evt.srcElement.value;

    this.searchEvent.emit(place);
  }

  showResults(places : any){
    //clear the list
    this._results.innerHTML = '';
    //genetate new list
    if (places.length < 1) {
        let placeRow = L.DomUtil.create('li', 'asdf', this._results);
        placeRow.appendChild(document.createTextNode('No results'));
    }
    else {
      places.forEach((place) => {
        let placeRow = L.DomUtil.create('li', '', this._results);

        placeRow.appendChild(document.createTextNode(`${place.display_name}`));
        placeRow.setAttribute('alt', `${place.display_name}`);

        L.DomEvent.addListener(placeRow, 'click', this.moveLocation,  {
          'location' :new Location(
                        place.display_name, 
                        [
                          Number(place.lat),
                          Number(place.lon)
                        ]
                      ),
          'emitter' : this.moveLocationEvent
        });
      });

      let place = places[1];
      let placeRow = L.DomUtil.create('li', '', this._results);
      placeRow.appendChild(document.createTextNode(`${place.licence}`));
    }
  }

  moveLocation() {
    this.emitter.emit(this.location);
  }

  toggle() {
    if(this.toggled) {  //currently true, remove class
      L.DomUtil.addClass(this._input,'leaflet-geocoder-toggle-on');
      L.DomUtil.addClass(this._results,'leaflet-geocoder-toggle-on');
    }
    else{
      L.DomUtil.removeClass(this._input,'leaflet-geocoder-toggle-on');
      L.DomUtil.removeClass(this._results,'leaflet-geocoder-toggle-on');
    }

    this.toggled = !this.toggled;
  }
}
