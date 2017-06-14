import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
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

  tryingGeocoding:boolean = false;
  successGeocoding:boolean = false;

  input:any;

  constructor( private generalService: GeneralService, private apicallService: ApicallService, private router: Router, private zone: NgZone ) { }

  ngOnInit() {
  	this.input = document.getElementById('search_autocomplete');
  	let options = {
  		types: ['geocode'],
  		componentRestrictions: {country: 'be'}
  	};

  	let autocomplete = new google.maps.places.Autocomplete(this.input, options);

    google.maps.event.addDomListener(this.input, 'keydown', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

  	autocomplete.addListener('place_changed', () => {
  		this.place = autocomplete.getPlace();
  		this.location = this.place.formatted_address;
  	});
  }

  ngAfterViewInit() {
    let geocoder = new google.maps.Geocoder;
    if (navigator.geolocation && ((<HTMLInputElement>this.input).value == "")) {
      this.tryingGeocoding = true;
      navigator.geolocation.getCurrentPosition( (position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        geocoder.geocode({'location': pos}, (result, status) => {
          if (status === 'OK') {
              if (result[1]) {
                let address = result[1].formatted_address;

                if( (<HTMLInputElement>this.input).value == "" ) {
                  this.successGeocoding = true;
                  this.tryingGeocoding = false;
                  this.generalService.userLocation = address;

                  this.zone.run(() => {});
                } 
                else {
                  this.tryingGeocoding = false;
                }
              } 
              else {
                this.tryingGeocoding = false;
              }
            } 
          else {
            this.tryingGeocoding = false;
          }
        });
      });
    }
    else {
      this.tryingGeocoding = false;
    }
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
