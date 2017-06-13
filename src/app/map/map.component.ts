import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

declare var google:any;

@Component({
	selector: 'map-component',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	map:any;
	markers:any[] = [];

	userIcon:string = 'https://maps.google.com/mapfiles/kml/paddle/grn-circle_maps.png';
	shopIcon:string = 'https://maps.google.com/mapfiles/kml/paddle/grn-circle_maps.png';

	private locations:any = [];

	constructor( private generalService: GeneralService ) { }

	ngOnInit() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			center: this.generalService.userLocationLatLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		this.updateMarkers();
		




		
		/*let shops = this.generalService.filteredShops;
		let userLatLng = this.generalService.userLocationLatLng;

		for( let i = 0; i < shops.length; i++ ) {

			let loc = {
				"name": shop.name,
				"lat": shops[i].latlng.lat,
				"lng": shops[i].latlng.lng
			};

			this.locations[i] = loc;
		}

		let map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			center: userLatLng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		//let infowindow = new google.maps.InfoWindow();
		let marker, i;

		let icon = 'https://maps.google.com/mapfiles/kml/paddle/grn-circle_maps.png';

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(userLatLng.lat, userLatLng.lng),
			map: map,
			icon: icon
		});

		/*for (i = 0; i < this.locations.length; i++) { 
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng),
				map: map
			});

			/*google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));* /
		}*/
	}

	updateMarkers() {
		if(!this.map) { return; }

		this.markers.forEach(marker => marker.setMap(null));

		let marker = new google.maps.Marker({
			position: new google.maps.LatLng(this.generalService.userLocationLatLng.lat, this.generalService.userLocationLatLng.lng),
			map: this.map,
			icon: this.userIcon
		});

		this.generalService.filteredShops.forEach(shop => {

			let loc = {
				"name": shop.name,
				"lat": shop.latlng.lat,
				"lng": shop.latlng.lng
			};

			this.markers.push(new google.maps.Marker({
				position: new google.maps.LatLng(loc.lat, loc.lng),
				map: this.map
			}));
		});

		this.fitMarkersInMap();

	}

	fitMarkersInMap() {
		let bounds = new google.maps.LatLngBounds();

		this.markers.forEach(marker => bounds.extend(marker.getPosition()));
		this.map.fitBounds(bounds);

	}

}
