import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ApicallService } from '../services/apicall.service';

declare var google:any;

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	pos:any = {};

  constructor(private apicallService: ApicallService) { }

  ngOnInit() {}

  ngAfterViewInit() {
  	/*let geocoder = new google.maps.Geocoder;
  	console.log( 'init' );
  	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        geocoder.geocode({'location': this.pos}, (result, status) => {
        	if (status === 'OK') {
            	if (result[1]) {
            	}
            }
        });
      });
    }*/
  }
}
