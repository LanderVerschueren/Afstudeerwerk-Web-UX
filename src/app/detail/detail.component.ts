import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	id:number;
	products:any;
	shop:any;
	cartShowing:boolean = false;

  	constructor( private route: ActivatedRoute, private router: Router, private generalService : GeneralService, private zone: NgZone ) { }

  	ngOnInit() {
  		this.route.params.subscribe(params => {
	    	if (params['id']) {
	    		this.id = params['id'];

	    		if( !this.generalService.shops.length ) {
	    			this.generalService.getShop( this.id, (r) => {
	    				if( r.message ) {
	    					this.router.navigate(['404']);
	    				} else {
		    				this.shop = r;
		    			}
	    			});
	    		} else {
	    			let index = this.generalService.shops.findIndex( r => r.shop_id == this.id);
	    			this.shop = this.generalService.shops[ index ];
	    		}

	    		this.products = this.generalService.getProducts( this.id, (r:any) => {
	    			this.products = r;
	    		});
	    	}
		});
 	}

 	toggleDisplayCart(e) {
 		console.log( this.generalService.cart[this.id].products );
 		if( !this.cartShowing ) {
 			this.cartShowing = true;
 			document.body.className += 'no_scroll';
 		} else if ( this.cartShowing && ( e.target.className == 'cart' || e.target.className == 'cart_close' ) ) {
 			this.cartShowing = false;
 			document.body.className = document.body.className.replace("no-javascript","");
 		}
 	}
 	
}
