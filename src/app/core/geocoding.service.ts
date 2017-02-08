import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Address {
	constructor(
		public city_district :string,
		public country       :string,
		public country_code  :string,
		public county        :string,
		public state         :string) {}
}


export class Place {	
	public address		  :Address;
	public class          :string;
	public display_name   :string;
	public icon           :string;
	public importance     :string;
	public lat            :string;
	public licence        :string;
	public lon            :string;
	public osm_id         :string;
	public osm_type       :string;
	public place_id       :string;
	public type           :string;
}

@Injectable()
export class GeocodingService {
   constructor(private http: Http) { }

    getAddresses(address: string) {
	    return this.http.get(`http://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`)
	      		   .map(response => response.json() as Place[]);
	}

}