import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	@Input() product:any;
  @Input() type:string;
	amount:number;
	total_price: number;
  model: any = {};
  adding:boolean = false;
  productForm: FormGroup;

  category:any;

  constructor( private generalService : GeneralService, private fb: FormBuilder) {
    this.productForm = fb.group ({
        'amount': [null, Validators.compose([Validators.required, this.checkAmount])]
    })
  }

 	ngOnInit() {
 		this.total_price = 0;
    this.type = this.type.toLowerCase();
  }

  checkAmount(control: FormControl) {
    if( control.value && control.value < 1 ) {
      return { "amountToLow": true };
    }
    
    return null;
  }

	inputChange( event: any) {
    let amount;

    if( this.type == 'beenhouwerij' ) {
  		amount = event.target.value / 1000;
    }
    else {
      amount = event.target.value;
    }
		this.total_price = Math.round( (amount * this.product['price']) * 100 ) / 100;
	}

  add( value:any ) {
    if( value.amount && !this.generalService.maxProducts && !this.generalService.maxPrice) {
      this.adding = true;
      let shop_id         = this.product['shop_id'];
      let product_id      = this.product['id'];
      let product_name    = this.product['product_name'];
      let amount          = value.amount;
      let price           = this.product['price'];
      let total_price     = this.total_price;

      let order: any = {
        'product_id': product_id,
        'product_name': product_name,
        'amount': amount,
        'price': price,
        'total_price': total_price
      }

      let add = this.generalService.addToCart( shop_id, order );

      if( add ) {
        this.adding = false;
        this.productForm.controls['amount'].setValue( "" );
        this.total_price = 0;
      }
      else {
        this.adding = false;
        this.productForm.controls['amount'].setValue( "" );
        this.total_price = 0;
      }
    }
  }
}
