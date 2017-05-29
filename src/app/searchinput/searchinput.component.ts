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
  old_location:string;

  constructor( private generalService: GeneralService, private router: Router ) { }

  ngOnInit() {
  	var input = document.getElementById('search_autocomplete');
  	var options = {
  		types: ['geocode'],
  		componentRestrictions: {country: 'be'}
  	};
  	var autocomplete = new google.maps.places.Autocomplete(input, options);

  	autocomplete.addListener('place_changed', () => {
  		var place = autocomplete.getPlace();
  		this.location = place.formatted_address;
  	});
  }

  searchSubmit() {
	  this.router.navigate(['/search', this.location]);
  }
}
