import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

declare var google:any;

@Component({
  selector: 'searchinput-component',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.scss']
})

export class SearchinputComponent implements OnInit {

  constructor( private generalService: GeneralService ) { }

  ngOnInit() {
  	var input = document.getElementById('search_autocomplete');
  	console.log( input );
	var autocomplete = new google.maps.places.Autocomplete(input);
  }

}
