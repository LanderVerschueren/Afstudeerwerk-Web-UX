import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { GeneralService } from '../services/general.service';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'pay-component',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
	shop:any;
	user:any;
	id:string;
	payForm: FormGroup;

	total_price:number;
	total_products:number;

	constructor(private route: ActivatedRoute, private payService : PayService, private generalService : GeneralService, 
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
				console.log( this.user );
			});
		});
	}
}
