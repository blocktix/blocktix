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

let TODAY = new Date();
let EVENTS = [
  {
    id: 1,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'Belgian Beer Expo',
    description: 'The Belgian beer expo in August, Hops, Malts, Ale, Beer Tastery.',
    location: <Location>{address: 'Victory Church, Jeffreys Bay', coordinates: [-34.025859, 24.90867]},
    startTime: new Date().setDate(TODAY.getDay() + 1),
    endTime: new Date().setDate(TODAY.getDay() + 2),
    tickets: [

    ],
    bids: [

    ]
  },
  {
    id: 2,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'Jetski rally',
    description: 'Lets rally, straight from St Francis Bay to Jeffreys Bay for breakfast, lunch and supper. The rest of the day we\'ll play.',
    location: <Location>{address: 'Port, St Francis Bay', coordinates: [-34.173662, 24.840149]},
    startTime: new Date().setDate(TODAY.getDay() + 4),
    endTime: new Date().setDate(TODAY.getDay() + 4),
    tickets: [

    ],
    bids: [

    ]
  },
  {
    id: 3,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'Mountain party',
    description: 'Dance the night away in the mountains, surrounded by forest. Chilled vibes and great times await.',
    location: <Location>{address: 'Rooi Hoek,Quacha, Eastern Cape', coordinates: [-33.668731, 24.4050843]},
    startTime: new Date().setDate(TODAY.getDay() + 5),
    endTime: new Date().setDate(TODAY.getDay() + 6),
    tickets: [

    ],
    bids: [

    ]
  },
  {
    id: 4,
    organizer: 0xbb9bc244d798123fde783fcc1c72d3bb8c189413,
    name: 'Blocktix meet up',
    description: 'For every Blocktix enthusiast in the area, we\'ll tell talk about all the best events we\'ve all attended and more',
    location: <Location>{address: 'Bridge Street Brewery, Port Elizabeth, Eastern Cape', coordinates: [-33.9608879, 25.6096901]},
    startTime: new Date().setDate(TODAY.getDay() + 8),
    endTime: new Date().setDate(TODAY.getDay() + 8),
    tickets: [

    ],
    bids: [

    ]
  }
];

let EVENTSEQUENCE = EVENTS.length;

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
      .then(_event => event);
  }
}
