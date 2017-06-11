import { Component, OnInit, Input, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ApicallService } from '../services/apicall.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

// import '../../assets/scripts/paylane.js';

declare var PayLaneClient:any;

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

	@Input() type:string;
	ip:string;
	info:any;
	token:string;

	checkoutForm:FormGroup;
	//@Output() cardDetails:object;

	constructor(private route: ActivatedRoute, private apicallService: ApicallService, private fb: FormBuilder) {
		this.checkoutForm = fb.group({
			'card_name': [null, Validators.required],
			'card_number': [null, Validators.required],
			'card_cvv': [null],
			'card_expire_month': [null, Validators.required],
			'card_expire_year': [null, Validators.required]
		});
	}

	ngOnInit() {
		this.info = JSON.parse( localStorage.getItem( 'info' ) );

		this.apicallService.get( "https://api.ipify.org", r => { this.ip = r; });

		/*this.apicallService.post( this.generalService.apilink + "storeOrder", {'user_id': user_id, 'shop_id': shop_id, 'email': email, 'phonenumber': phonenumber, 'name': name, 'payment_method': payment_method, 'date_pickup': date_pickup, 'period_pickup': period_pickup, 'products': products}, (r) => {
			console.log( r );
		}, (error) => {
			console.log( error );
		});*/

		/*this.route.params.subscribe( params => {
			this.type = params['type'];

			this.apicallService.get("https://api.ipify.org", r => {
				console.log( r );
				this.ip = r;
			});

			try
		    {
		        let client = new PayLaneClient({
		            publicApiKey: 'a56a065dddeb6916435556f6b81ccccaaf5f7d4f',
		            paymentForm: 'checkout-form',
		            callbackHandler: r => {
		            	let paymentDetails = localStorage.getItem('paymentDetails');
		            	console.log( paymentDetails );
		            }
		        });
		    }
		    catch (e)
		    {
		        console.log(e); // exceptions are fatal
		    }
		});*/

		try
	    {
	        var client = new PayLaneClient({
	            publicApiKey: 'a56a065dddeb6916435556f6b81ccccaaf5f7d4f',
	            paymentForm: 'checkout-form',
	            callbackHandler: function(token)
	            {
	                this.token = token;
	            }
	        });
	    }
	    catch (e)
	    {
	        console.log(e); // exceptions are fatal
	    }
	}

	checkoutOrder( value:any ) {
		console.log( value );
		let sale:any = {
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
        };

        this.apicallService.post( "https://direct.paylane.com/rest/cards/saleByToken", {'sale': sale, 'customer': customer, 'card': card}, r => { console.log(r); }, error => { console.log(error); });
	}

}
