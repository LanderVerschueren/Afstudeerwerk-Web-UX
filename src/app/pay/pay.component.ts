import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralService } from '../services/general.service';
import { ApicallService } from '../services/apicall.service';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'pay-component',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
	shop:any;
	user:any;
	id:string = '';
	payForm: FormGroup;

	total_price:number;
	total_products:number;

	constructor(private route: ActivatedRoute, private payService : PayService, private generalService : GeneralService, private apicallService : ApicallService,
    private fb: FormBuilder) {
		this.payForm = fb.group({
			'name': [null, Validators.required],
			'email': [null, Validators.required],
			'phonenumber' : [null, Validators.required],
			'collection_day': [null, Validators.required],
			'collection_period': [null, Validators.required],
			'payment_method': [null, Validators.required]
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = params['id'];
			this.generalService.getShop( this.id, (r) => {
				this.shop = r;
				this.total_price = this.generalService.cart[ this.id ].total_price;
				this.total_products = this.generalService.cart[ this.id ].total_products;
			});
			this.generalService.getUser( (r) => {
				this.user = r;
			});
		});
	}

	saveOrder(value:any) {
		let user_id = this.id;
		let shop_id = this.shop.id;
		let name = value.name;
		let email = value.email;
		let phonenumber = value.phonenumber;
		let payment_method = value.payment_method;
		let products = JSON.stringify(this.generalService.cart[this.id].products);
		let date_pickup = value.collection_day;
		let period_pickup = value.collection_period;

		this.apicallService.post( this.generalService.apilink + "storeOrder", {'user_id': user_id, 'shop_id': shop_id, 'email': email, 'phonenumber': phonenumber, 'name': name, 'payment_method': payment_method, 'date_pickup': date_pickup, 'period_pickup': period_pickup, 'products': products}, (r) => {
			console.log( r );
		}, (error) => {
			console.log( error );
		});
	}
}
