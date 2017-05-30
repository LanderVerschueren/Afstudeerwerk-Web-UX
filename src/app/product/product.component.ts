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
  model: any = {};
  adding:boolean = false;

  constructor( private generalService : GeneralService) { }

 	ngOnInit() {
 		this.total_price = 0;
  }

	inputChange( event: any) {
		let amount = event.target.value / 1000;
		this.total_price = Math.round( (amount * this.product['price']) *100 ) / 100;
	}

  add() {
    this.adding = true;
    let shop_id         = this.product['fk_shop_id'];
    let product_id      = this.product['product_id'];
    let product_name    = this.product['product_name'];
    let amount          = this.model['amount'];
    let price           = this.product['price'];
    let total_price     = this.total_price;

    let order: any = {
      'product_id': product_id,
      'product_name': product_name,
      'amount': amount,
      'price': price,
      'total_price': total_price
    }

    this.generalService.addToCart( shop_id, order );

    /*if( add ) {
      this.adding = false;
    }
    else {
      this.adding = false;
    }*/
  }
}
