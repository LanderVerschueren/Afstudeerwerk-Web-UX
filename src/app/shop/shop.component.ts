import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'shop-component',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {

	@Input() shop;
	
	backgroundimage:string = "url('assets/img/card/modern-butchers-shop.jpg')";

	constructor() { }

	ngOnInit() {

		if(this.shop.image) {

			let img = new Image();
			img.onload = function() { this.backgroundimage = "url(" + img.src + ")"; }.bind(this);
			img.src = this.shop.image;

		}
	}

}
