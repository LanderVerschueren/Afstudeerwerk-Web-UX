import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	shops:any;
	/*shops:Array<any> = [
		{
			'zaaknaam'	: 	'Beenhouwerij Moortgat',
			'straat'	:	'Kloosterstraat',
			'nummer'	:	'10',
			'gemeente'	:	'Beveren',
			'type'		:	'Beenhouwerij'
		},
		{
			'zaaknaam'	: 	'Beenhouwerij Moortgat',
			'straat'	:	'Kloosterstraat',
			'nummer'	:	'10',
			'gemeente'	:	'Beveren',
			'type'		:	'Beenhouwerij'
		},
		{
			'zaaknaam'	: 	'Beenhouwerij Moortgat',
			'straat'	:	'Kloosterstraat',
			'nummer'	:	'10',
			'gemeente'	:	'Beveren',
			'type'		:	'Beenhouwerij'
		},
		{
			'zaaknaam'	: 	'Beenhouwerij Moortgat',
			'straat'	:	'Kloosterstraat',
			'nummer'	:	'10',
			'gemeente'	:	'Beveren',
			'type'		:	'Beenhouwerij'
		},
		{
			'zaaknaam'	: 	'Beenhouwerij Moortgat',
			'straat'	:	'Kloosterstraat',
			'nummer'	:	'10',
			'gemeente'	:	'Beveren',
			'type'		:	'Beenhouwerij'
		},
		{
			'zaaknaam'	: 	'Beenhouwerij Moortgat',
			'straat'	:	'Kloosterstraat',
			'nummer'	:	'10',
			'gemeente'	:	'Beveren',
			'type'		:	'Beenhouwerij'
		}
	];*/

  constructor( private generalService : GeneralService ) { }

  ngOnInit() {

  	this.generalService.getShops( (r) => {
  		console.log( r );
  		this.shops = r;
  	});
  }

}
