import { Injectable } from '@angular/core';

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
    public location: string,
    public startTime: number,
    public endTime: number,
    public tickets: Ticket[],
    public bids: Bid[],
    ) { }
}

let EVENTS = [
  {
    id: 1,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'Belgian Beer Expo',
    description: 'The Belgian beer expo in August, Hops, Malts, Ale, Beer Tastery.',
    location: 'figure it out',
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
    location: 'figure it out',
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
  getEvents() {
    return eventsPromise;
  }

  getEvent(id: number | string) {
    console.log('Event#getEvent(): Get Event');
    return eventsPromise
      .then(events => events.find(
        event => event.id === +id));
  }
}
