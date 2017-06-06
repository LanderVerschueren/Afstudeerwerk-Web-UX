import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'shop-component',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {

	@Input() shop;
	
	backgroundimage:string = "assets/img/card/modern-butchers-shop.jpg";
	backgroundimageUrl:string = "url('assets/img/card/modern-butchers-shop.jpg')";

	constructor() { }

	ngOnInit() {
		if(this.shop.image) {

			let img = new Image();
			img.onload = () => {
				this.backgroundimage = img.src;
				this.backgroundimageUrl = img.src;
			};
			img.src = this.shop.image;

		}
	}
}
