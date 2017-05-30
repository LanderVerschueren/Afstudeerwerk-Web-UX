import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralService } from '../services/general.service';

declare var google:any;

@Component({
  selector: 'searchinput-component',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})

export class SearchinputComponent implements OnInit {

	location:string;
  place:any;

  constructor( private generalService: GeneralService, private router: Router ) { }

  ngOnInit() {
  	let input = document.getElementById('search_autocomplete');
  	let options = {
  		types: ['geocode'],
  		componentRestrictions: {country: 'be'}
  	};
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

  searchSubmit() {
    if( this.place ) {
      this.router.navigate(['/search', this.location]);
    }
  }
}
