import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service.ts';
import { EventList } from './event-list.component.ts';
//import { Title } from './title';

describe('EventList', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule([
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },

    AppState,
    //Title,
    EventList
  ]));

  it('should have default data', inject([ EventList ], (events) => {
    expect(events.localState).toEqual({ value: '' });
  }));

  it('should have a events', inject([ EventList ], (events) => {
    expect(!!events.events).toEqual(true);
  }));

  it('should log ngOnInit', inject([ EventList ], (events) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    events.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
