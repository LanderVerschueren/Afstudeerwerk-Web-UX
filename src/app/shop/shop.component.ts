import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'shop-component',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {

	@Input() shop;
	
	backgroundimage:string;
	backgroundimageUrl:string;

	constructor() { }

	ngOnInit() {
		if(this.shop.image) {
			this.backgroundimage = "assets/img/card/" + this.shop.image;
			this.backgroundimageUrl = "url('assets/img/card/" + this.shop.image + "')";
		}
		else {
			this.backgroundimage = "assets/img/bakkery_1.jpg";
			this.backgroundimageUrl = "url('assets/img/card/butchery_1.jpg')";
		}
	}
}
