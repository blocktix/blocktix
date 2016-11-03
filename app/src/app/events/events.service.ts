import { Injectable } from '@angular/core';

import { Location } from '../core/location.class';

export class Ticket {
  //constructor() {}
}

export class Bid {
  //constructor() {}
}

export class Event {
  constructor(
    public id: number,
    public name: string,
    public organizer: number,
    public description: string,
    public location: Location,
    public startTime: number,
    public endTime: number,
    public tickets: Ticket[],
    public bids: Bid[],
    ) { }
}

let EVENTSEQUENCE = 2;
let EVENTS = [
  {
    id: 1,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'Belgian Beer Expo',
    description: 'The Belgian beer expo in August, Hops, Malts, Ale, Beer Tastery.',
    location: {address: 'Victory Church, Jeffreys Bay', coordinates: [-34.025859, 24.90867]},
    startTime: new Date().getTime(),
    endTime: new Date().getTime(),
    tickets: [

    ],
    bids: [

    ]
  },
  {
    id: 2,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'aSouth African Beer Expo',
    description: 'The South African beer expo in August, Hops, Malts, Ale, Beer Tastery.',
    location: {address: 'Jolly Dolphin, Jeffreys Bay', coordinates: [-34.0531408, 24.9211184]},
    startTime: new Date().getTime(),
    endTime: new Date().getTime(),
    tickets: [

    ],
    bids: [

    ]
  }
];

let eventsPromise = Promise.resolve(EVENTS);

@Injectable()
export class EventsService {
  getEvents(): Promise<Event[]> {
    return eventsPromise;
  }

  getEvent(id: number | string): Promise<Event> {
    console.log('Event#getEvent(): Get Event');
    return eventsPromise
      .then(events => events.find(
        event => event.id === +id));
  }

  createEvent(event :Event): Promise<Event> {
    console.log('Event#Event(): Get Event');
    event.id = EVENTSEQUENCE++;
    EVENTS.push(event);
    console.log(EVENTS);
    return eventsPromise
      .then(success => true);
  }
}
