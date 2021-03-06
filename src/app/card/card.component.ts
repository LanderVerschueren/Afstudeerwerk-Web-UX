import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { ApicallService } from '../services/apicall.service';
import { GeneralService } from '../services/general.service';

declare var Stripe:any;

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit
 {
	ip:string;
	info:any;
	token:string;
	payment_success:boolean;
	formHidden:boolean = true;

	checkoutForm:FormGroup;

	stripe:any;
	elements:any;
	card:any;
	form:any;

	constructor(private router: Router, private route: ActivatedRoute, private apicallService: ApicallService, private generalService: GeneralService, private fb: FormBuilder) {
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

		if( this.info ) {
			localStorage.removeItem('info');

			this.apicallService.get( "https://api.ipify.org?format=json", (r) => { 
				this.ip = r.ip;

				if( this.info.payment_method == 'cash' ) {
					this.saveOrder();
					this.payment_success = true;
				}
				else {
					this.payment_success = false;
					this.formHidden = false;
				}
			}, (error) => {});
		}
		else {
			this.router.navigate(['']);
		}
	}

	ngAfterViewInit() {
		if( !this.payment_success && this.info ) {
			this.stripe = Stripe('pk_test_UezsCDqH1kbHDkJeblZIup7Z');
			
			this.elements = this.stripe.elements();

			this.card = this.elements.create('card');

			this.card.mount( '#card-element' );

			this.card.addEventListener('change', (event) => {
				let displayError = document.getElementById('card-errors');
				if (event.error) {
					displayError.textContent = event.error.message;
				} else {
					displayError.textContent = '';
				}
			});
		}
	}

	checkoutOrder() {
		this.stripe.createToken(this.card).then( (result) => {
			let params = result.token;
			if( result.token ) {
				this.apicallService.post( this.generalService.apilink + "charge", { token: params, amount: this.info.total_price, shop_id: this.info.shop_id, customer_id: this.info.customer_id }, (r) => {
					if( r.message == true ) {
						this.saveOrder();
					}
				}, (error) => {});
			}
		});
	}

	saveOrder() {
		let customer_id = this.info.customer_id;
		let shop_id = this.info.shop_id;
		let email = this.info.email;
		let name = this.info.name;
		let phonenumber = this.info.phonenumber;
		let payment_method = this.info.payment_method;
		let date_pickup = this.info.date_pickup;
		let period_pickup = this.info.period_pickup;
		let products = JSON.stringify( this.info.products );
		let total_price = this.info.total_price;
		let ip = this.ip;

		this.apicallService.post( this.generalService.apilink + "storeOrder", {'customer_id': customer_id, 'shop_id': shop_id, 'email': email, 'phonenumber': phonenumber, 'name': name, 'payment_method': payment_method, 'date_pickup': date_pickup, 'period_pickup': period_pickup, 'products': products, 'ip': this.ip, 'total_price': total_price}, (r) => {
			if( r.message == true ) {
				this.payment_success = true;
				this.formHidden = true;
				this.generalService.removeFromCart( this.info['shop_id'] );
			}
		}, (error) => {});
	}
}
