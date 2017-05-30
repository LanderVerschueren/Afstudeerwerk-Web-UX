
import { Injectable, NgZone } from '@angular/core';

declare var google: any;

@Injectable()

export class MapsService {

	constructor() {}

	getUserLocation() {

		return [0,0];

	}

	getDistance(latlngA:any, latlngB:any, cb:any = function() {}) {

		let distanceService = new google.maps.DistanceMatrixService();
		
		let data = {
			origins: latlngA,
			destinations: typeof latlngB !== typeof [] ? [latlngB] : latlngB,
			travelMode: 'DRIVING'
		};

		distanceService.getDistanceMatrix(data, cb);

	}

}
