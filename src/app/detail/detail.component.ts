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
	cartProducts:any;
	cartShowing:boolean = false;
	categories:any = [];
	categorySelected:string;
	categorySelecting:boolean = false;

  	constructor( private route: ActivatedRoute, private router: Router, private generalService : GeneralService, private zone: NgZone ) { }

  	ngOnInit() {
  		console.log( this.generalService.maxProducts );
  		this.route.queryParams.subscribe(params => {
	    	if (params['shop']) {
	    		this.id = params['shop'];

	    		if( !this.generalService.shops.length ) {
	    			this.generalService.getShop( this.id, (r) => {
	    				if( r.message ) {
	    					this.router.navigate(['404']);
	    				} else {
		    				this.shop = r;
		    			}
	    			});
	    		} else {
	    			let index = this.generalService.shops.findIndex( r => r.id == this.id);
	    			this.shop = this.generalService.shops[ index ];
	    		}

	    		this.products = this.generalService.getProducts( this.id, (r:any) => {
	    			this.products = r;

	    			this.products.forEach( product => {
	    				let index = this.categories.find( category => category == product.category );
	    				
	    				if ( !index ) {
	    					this.categories.push( product.category );
	    				}
	    			});

	    			this.categories.sort();
	    			this.categorySelected = this.categories[0];
	    		});
	    	}
		});
 	}

 	toggleDisplayCart(e) {
 		if( !this.cartShowing ) {
 			this.cartShowing = true;
 			document.body.className += 'no_scroll';
 		} else if ( this.cartShowing && ( e.target.classList.contains( 'cart' ) || e.target.classList.contains( 'cart_close' ) ) ) {
 			this.cartShowing = false;
 			document.body.className = document.body.className.replace("no_scroll","");
 		}
 	}

 	toggleDisplayCategory() {
 		( this.categorySelecting ) ? this.categorySelecting = false : this.categorySelecting = true;
 	}

 	placeOrder() {
 		document.body.className = document.body.className.replace("no_scroll","");
 		this.router.navigate(['/pay'], { queryParams: { shop: this.id } });
 	}

 	selectCategory( category ) {
 		this.categorySelected = category;

 		this.categorySelecting = false;
 	}

 	removeItem( product_id, price ) {
 		this.generalService.removeItemCart( this.id, product_id, price );
 	}
}
