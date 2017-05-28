import { Injectable } from '@angular/core';

import { ApicallService } from './apicall.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GeneralService {

	private subject = new Subject<any>();
	public token: string;
	public loggedIn:boolean;
	public loggedInUser: Array<any>;
	public cart: any = {
		'total_price': 0,
		'total_products' : 0,
		'products' : []
	};
	public shops: any;
	apilink:string = "http://localhost:8888/eindwerk/Afstudeerwerk-Web-UX/back-end/public/api/";

  	constructor( private apicallService : ApicallService, private http: Http ) {
  		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  		let cart = JSON.parse(localStorage.getItem('cart'));
        
        this.token = currentUser && currentUser.token;
        if( this.token ) {
        	this.getUser( (r:any) => {});
        }

        if( cart ) {
        	this.cart = cart;
        }

		this.subject.next( this.cart );
  	}

  	login(email: string, password: string, cb:any) {
        this.apicallService.post( this.apilink + 'authenticate', { email: email, password: password }, (r:any) => {
        	if( r.token ) {
        		this.token = r && r.token;
        		localStorage.setItem('currentUser', JSON.stringify({ email: email, token: this.token }));

        		cb( r );
        	}
        }, (error) => {
        	cb( error );
        });
    }

    getUser( cb:any ) {
    	this.apicallService.get( this.apilink + 'user?token=' + this.token, (r:any) => {
			if ( r.user ) {
				this.loggedInUser = r.user;
				this.loggedIn = true;

				cb( r );
			}
		});
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.loggedIn = false;
        this.loggedInUser = null;
        localStorage.removeItem('currentUser');
    }

    register( value, cb:any ) {
    	this.apicallService.post( this.apilink + 'register', value, (r:any) => {
    		cb( r );
    	}, (error:any) => {
    		cb( error );
    	});
    }

  	getShops() {
  		this.apicallService.get( this.apilink + "shops", (r) => {
  			console.log( r );
  			this.shops = r;
  		});
	}

	getProducts( id, cb:any ) {
		this.apicallService.get( this.apilink + "products/" + id, (r:any) => {
			cb(r);
			return r;
		} );
	}

	addToCart( order ) {
		let old_amount = this.cart['products'].length;
		if( Object.keys(order).length > 0 ) {
			this.cart['products'].push( order );

			if ( old_amount < this.cart['products'].length ) {
				this.cart.total_price += order.total_price;
				this.cart.total_products++;
				this.subject.next( this.cart );
				localStorage.setItem( 'cart', JSON.stringify(this.cart) );
				return true;
			}
			else {
				return false;
			}
		}
	}

	getCart(): Observable<any> {
        return this.subject.asObservable();
    }
}
