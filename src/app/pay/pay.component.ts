import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { GeneralService } from '../services/general.service';
import { ApicallService } from '../services/apicall.service';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'pay-component',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],

})
export class PayComponent implements OnInit {
	shop:any;
	user:any;
	id:string = '';
	payForm: FormGroup;
	paymentCard:string;
	submitted:boolean = false;

	total_price:number;
	total_products:number;

	constructor(private router: Router, private route: ActivatedRoute, private payService : PayService, private generalService : GeneralService, private apicallService : ApicallService,
    private fb: FormBuilder) {
		this.payForm = fb.group({
			'name': [null, Validators.required],
			'email': [null, Validators.compose([Validators.required, this.isValidMailFormat])],
			'phonenumber' : [null, Validators.required],
			'collection_day': [null, Validators.compose([Validators.required, this.isDateValid])],
			'collection_period': [null, Validators.required],
			'payment_method': [null, Validators.required]
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = params['id'];

			/*let newDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
			let curr_date = newDate.getDate();
		    let curr_month = newDate.getMonth() + 1; //Months are zero based
		    let curr_year = newDate.getFullYear();
		    let date = curr_year + "-" + curr_month + "-"+ curr_date;

		    this.payForm.controls['collection_day'].setValue( date );*/

			this.generalService.getShop( this.id, (r) => {
				this.shop = r;
				this.total_price = this.generalService.cart[ this.id ].total_price;
				this.total_products = this.generalService.cart[ this.id ].total_products;
			});
			this.generalService.getUser( (r) => {
				if( r != 'fail' ) {
					this.user = r.user;

					if( this.user ) {
						this.payForm.controls['name'].setValue( this.user['firstName'] + " " + this.user['lastName'] );
						this.payForm.controls['email'].setValue( this.user['email'] );
						this.payForm.controls['phonenumber'].setValue( this.user['phonenumber'] );
					}
				}
			});
		});
	}

	isValidMailFormat(control: FormControl){
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (!EMAIL_REGEXP.test(control.value)) {
            return { "emailNotValid": true };
        }

        return null;
    }

    isDateValid(control: FormControl){
		let newDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		let curr_date = newDate.getDate();
	    let curr_month = newDate.getMonth() + 1; //Months are zero based
	    let curr_year = newDate.getFullYear();
	    let date = curr_year + "-" + curr_month + "-"+ curr_date;

	    if( Date.parse(control.value) < Date.parse(date) ) {
	    	return { "dateNotValid": true };
	    }

		return null;
    }

    inputPayment( event ) {
    	this.paymentCard = event.target.value;
    }

	saveOrder(value:any, valid:boolean) {
		this.submitted = true;

		if( valid && this.submitted ) {
			let details:any = {};

			details.customer_id = this.id;
			details.shop_id = this.shop.id;
			details.name = value.name;
			details.email = value.email;
			details.phonenumber = value.phonenumber;
			details.payment_method = value.payment_method;
			details.products = this.generalService.cart[this.id].products;
			details.date_pickup = value.collection_day;
			details.period_pickup = value.collection_period;
			details.total_price = this.total_price;

			localStorage.setItem( 'info', JSON.stringify( details ) );

			this.router.navigate(['process']);
		}
		else {
			this.submitted = false;
			let controls = this.payForm.controls;

			for( let control in controls ) {
				controls[control].markAsTouched();
			}
		}
	}
}
