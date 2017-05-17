import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'howto-component',
	templateUrl: './howto.component.html',
	styleUrls: ['./howto.component.scss']
})
export class HowtoComponent implements OnInit {
	steps:Array<any> = [
		{
			'image'	: 	'placeholder.svg',
			'lead'	:	'Locatie invoeren',
			'trail'	:	'Voer je adres in of laat ons je locatie bepalen.'
		},
		{
			'image'	: 	'shopping-cart.svg',
			'lead'	:	'Kies je winkel en bestel',
			'trail'	:	'Favoriete bakker of beenhouwer? Bestel je brood of charcuterie bij een plaatselijke winkel.'
		},
		{
			'image'	: 	'shopping-basket.svg',
			'lead'	:	'Betaal en haal je bestelling af',
			'trail'	:	'Betaal met een van onze betaalmogelijkheden en haal je bestelling af.'
		}
	];

  	constructor() { }

  	ngOnInit() {
  	}

}
