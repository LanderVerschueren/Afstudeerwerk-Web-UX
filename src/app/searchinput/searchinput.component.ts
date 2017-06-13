import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralService } from '../services/general.service';
import { ApicallService } from '../services/apicall.service';

declare var google:any;

@Component({
  selector: 'searchinput-component',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})

export class SearchinputComponent implements OnInit {

	location:string;
  place:any;

  constructor( private generalService: GeneralService, private apicallService: ApicallService, private router: Router, private zone: NgZone ) { }

  ngOnInit() {
  	let input = document.getElementById('search_autocomplete');
  	let options = {
  		types: ['geocode'],
  		componentRestrictions: {country: 'be'}
  	};

    let geocoder = new google.maps.Geocoder;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        geocoder.geocode({'location': pos}, (result, status) => {
          if (status === 'OK') {
              if (result[1]) {
                let address = result[1].formatted_address;

                if( (<HTMLInputElement>input).value == "" ) {
                  this.generalService.userLocation = address;

                  this.zone.run(() => {});
                } 
              }
            }
        });
      });
    }

  	let autocomplete = new google.maps.places.Autocomplete(input, options);

    google.maps.event.addDomListener(input, 'keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

  	autocomplete.addListener('place_changed', () => {
  		this.place = autocomplete.getPlace();
  		this.location = this.place.formatted_address;
  	});
  }

  searchSubmit(event) {
    this.place = event.target.children[0].value;
    this.location = event.target.children[0].value;
    if( this.place ) {
      this.zone.run(() => {
        this.router.navigate(['/search', this.location]);
      });
    }
  }
}
