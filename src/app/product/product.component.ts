import { Component, OnInit, Input } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	@Input() product;
	amount:number;
	total_price: number;

  	constructor( private generalService : GeneralService) { }

 	ngOnInit() {
 		console.log(this.product);
 		this.total_price = 0;
  	}

  	inputChange( event: any) {
  		let amount = event.target.value / 1000;
  		this.total_price = Math.round( (amount * this.product['price']) *100 ) / 100;
  		console.log( this.total_price );
  	}
}
