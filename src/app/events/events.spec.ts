import {
  TestBed,
  inject
} from '@angular/core/testing';
import { Component } from '@angular/core';
//import { BaseRequestOptions, Http } from '@angular/http';
//import { MockBackend } from '@angular/http/testing';

import { EventService } from './events.service.ts';

describe('EventService', () => {
  beforeEach(() => TestBed.configureTestingModule([
    //BaseRequestOptions,
    //MockBackend,
    /*
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },*/
    Event
  ]));


  it('should have http', inject([ EventService ], (event) => {
    expect(!!event.http).toEqual(true);
  }));

  it('should get data from the server', inject([ EventService ], (event) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    event.getData();
    expect(console.log).toHaveBeenCalled();
    expect(event.getData()).toEqual({ value: 'AngularClass' });
  }));

});
