import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	shops:Array<any> = [
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
	];

  constructor() { }

  ngOnInit() {
  }

}
