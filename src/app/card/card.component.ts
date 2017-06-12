import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ApicallService } from '../services/apicall.service';
import { GeneralService } from '../services/general.service';

// import '../../assets/scripts/paylane.js';

declare var PayLaneClient:any;

declare var Stripe:any;

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit
 {

	//@Input() type:string;
	ip:string;
	info:any;
	token:string;
	payment_success:boolean;

	checkoutForm:FormGroup;

	stripe:any = Stripe('pk_test_UezsCDqH1kbHDkJeblZIup7Z');
	//@Output() cardDetails:object;

	constructor(private route: ActivatedRoute, private apicallService: ApicallService, private generalService: GeneralService, private fb: FormBuilder) {
		this.checkoutForm = fb.group({
			'card_name': [null, Validators.required],
			'card_number': [null, Validators.required],
			'card_cvc': [null],
			'card_expire_month': [null, Validators.required],
			'card_expire_year': [null, Validators.required]
		});
	}

	ngOnInit() {
		this.info = JSON.parse( localStorage.getItem( 'info' ) );

		this.apicallService.get( "https://api.ipify.org?format=json", (r) => { 
			this.ip = r.ip;

			if( this.info.payment_method == 'cash' ) {
				let user_id = this.info.user_id;
				let shop_id = this.info.shop_id;
				let email = this.info.email;
				let name = this.info.name;
				let phonenumber = this.info.phonenumber;
				let payment_method = this.info.payment_method;
				let date_pickup = this.info.date_pickup;
				let period_pickup = this.info.period_pickup;
				let products = JSON.stringify( this.info.products );
				let ip = this.ip;

				this.apicallService.post( this.generalService.apilink + "storeOrder", {'user_id': user_id, 'shop_id': shop_id, 'email': email, 'phonenumber': phonenumber, 'name': name, 'payment_method': payment_method, 'date_pickup': date_pickup, 'period_pickup': period_pickup, 'products': products, 'ip': this.ip}, (r) => {
					this.payment_success = true;
				}, (error) => {
					console.log( error );

				});
			}
			else {
				this.payment_success = false;
			}
		}, (error) => { console.log(error) });
	}

	checkoutOrder( value:any ) {
		console.log( value );
		this.stripe.createToken({
			'name': value.card_name,
			'number': value.card_number,
			'exp_month': value.card_expire_month,
			'exp_year': value.card_expire_year
		}).then( (result) => {
			console.log( result );
		});

		/*let sale:any = {
        	'amount': this.info.total_price,
        	'currency': 'EUR',
        	'description': 'Bestelling bij shop (shop_id): ' + this.info.shop_id + ', door user met id (user_id): ' + this.info.user_id
        };

        let customer:any = {
        	'name': this.info.name,
        	'email': this.info.email,
        	'ip': this.ip
        };

        let card:any = {
        	'token': this.token
        };*/
	}

}
