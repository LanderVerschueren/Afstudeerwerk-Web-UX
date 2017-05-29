import { Injectable, NgZone } from '@angular/core';

import { ApicallService } from './apicall.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

declare var google: any;

@Injectable()
export class GeneralService {

	private subjectShops = new Subject<any>();
	public token: string;
	public loggedIn:boolean;
	public loggedInUser: Array<any>;
	public cart: any = {
		'total_price': 0,
		'total_products' : 0,
		'products' : []
	};
	public shops: any = [];
	public filteredShops:any = [];
	//public filteredShopsCallback:any = function(r:any){ console.log('godver', r); };
	public userLocation:any;
	public userLocationLatLng:any;
	public numberResults:number;

	private apilink:string = "http://localhost:8888/eindwerk/Afstudeerwerk-Web-UX/back-end/public/api/";
	private googleApiKey:string = "AIzaSyCH7nKkRCoG6ONdK2iBhS_xI1LZSJPkJQs";

  	constructor( private apicallService : ApicallService, private http: Http, private zone: NgZone ) {
  		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  		let cart = JSON.parse(localStorage.getItem('cart'));
        
        this.token = currentUser && currentUser.token;
        if( this.token ) {
        	this.getUser( (r:any) => {});
        }

        if( cart ) {
        	this.cart = cart;
        }
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
    	return this.filteredShops;
    }

    /*getShops() {
    	return this.subjectShops.asObservable();
    }*/

  	loadShops( location ) {
  		this.userLocation = location;
  		this.apicallService.get( this.apilink + "shops", (r) => {
  			this.shops = r;
  			this.getGeocoding( this.userLocation, (r:any) => {
  				this.userLocationLatLng = r;
  				this.getDistances( (r) => {
  					for (var i = 0; i < this.shops.length; i++) {
						this.filteredShops[ i ] = this.shops[ i ];
						this.filteredShops[ i ].distance = r.rows[0].elements[ i ].distance.value;
					}

					this.filteredShops.sort(this.compare);

					this.zone.run(() => {})
  				});
  			});
  		});
	}

	getDistances( cb:any ) {
		let destinations:string[] = [];
		
		for (var i = this.shops.length - 1; i >= 0; i--) {
			destinations[i] = this.shops[i].street + ", " + this.shops[i].number + ", " +  this.shops[i].postalCode + ", " + this.shops[i].city;
		}

		let origin = this.userLocationLatLng.lat + "," + this.userLocationLatLng.lng;

		let service = new google.maps.DistanceMatrixService();

		service.getDistanceMatrix(
		{
			origins: [origin],
		    destinations: destinations,
		    travelMode: 'DRIVING',
		},
			(response, status) => {
				cb( response );
			}
		);


	}

	/*processDistances( response, status) {

		let fshops = [];

		for (var i = 0; i < this.shops.length; i++) {
			fshops[ i ] = this.shops[ i ];
			fshops[ i ].distance = response.rows[0].elements[ i ].distance.value;
		}

		this.filteredShops = fshops;

		//this.filteredShopsCallback(fshops);

		this.sort();
	}*/

	getGeocoding( adres:any, cb:any ) {
		this.apicallService.get( "https://maps.googleapis.com/maps/api/geocode/json?address=" + adres + "&key=" + this.googleApiKey, (r:any) => {
			cb( r.results[0].geometry.location );
		});
	}

	/*sort() {
		this.filteredShops.sort((a,b) => {
			return a.distance - b.distance;
		});

		this.subjectShops.next( this.filteredShops );
	}*/

	compare(a,b) {
  		if (a.distance < b.distance)
    		return -1;
  		if (a.distance > b.distance)
    		return 1;
  		return 0;
	}

	getProducts( id, cb:any ) {
		this.apicallService.get( this.apilink + "products/" + id, (r:any) => {
			cb(r);
		} );
	}

	addToCart( order ) {
		let old_amount = this.cart['products'].length;
		if( Object.keys(order).length > 0 ) {
			this.cart['products'].push( order );

			if ( old_amount < this.cart['products'].length ) {
				this.cart.total_price += order.total_price;
				this.cart.total_products++;
				localStorage.setItem( 'cart', JSON.stringify(this.cart) );
				return true;
			}
			else {
				return false;
			}
		}
	}
}
