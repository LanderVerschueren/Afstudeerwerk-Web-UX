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

  	constructor( private generalService : GeneralService) { }

 	ngOnInit() {
 		console.log(this.product);

  	}

  	inputChange( event: any) {
  		console.log( event.target.value );
  		this.amount = event.target.value;
  	}

}
