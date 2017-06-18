import { Injectable, NgZone } from '@angular/core';

import { ApicallService } from './apicall.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

declare var google: any;

@Injectable()
export class GeneralService {

	private subjectShops = new Subject<any>();
	public token: string = '';
	public loggedIn:boolean;
	public loggedInUser: Array<any>;
	public cart: any = {};
	public shops: any = [];
	public filteredShops:any = [];
	public userLocation:any;
	public userLocationLatLng:any;
	public numberResults:number;

	public searchView:string = 'list';
	public filterParam:string = 'all';

	public maxProducts:boolean = false;
	public maxPrice:boolean = false;
	
	public apilink:string = "http://localhost:8888/eindwerk/Afstudeerwerk-Web-UX/back-end/public/api/";
	//public apilink:string = "https://landerverschueren.webhosting.be/back-end/public/api/";
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
    	if ( !this.loggedIn ) { 
    		if( this.token ) {
		    	this.apicallService.get( this.apilink + 'user?token=' + this.token, (r:any) => {
					if ( r.user ) {
						this.loggedInUser = r.user;
						this.loggedIn = true;
						cb( this.loggedInUser );
					}
				}, (error) => { cb( error ) });

		    }
		    else {
		    	cb( 'fail' );
		    }
		}
		else {
			cb( this.loggedInUser );
		}
    }

    getOrders( cb:any ) {
    	this.apicallService.get( this.apilink + 'orders/' + this.loggedInUser['id'] + "/" + this.loggedInUser['role'], (r:any) => {
    		if( r ) {
				r.sort(this.compare('created_at'));
				cb( r );
    		}
    		cb( r );
    	}, ( error ) => {
    		cb( error );
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

    getShop( id, cb:any ) { 
    	this.apicallService.get( this.apilink + "shop/" + id, (r) => {
    		cb( r );
    	}, (error) => {
    		cb( error );
    	})
    }


    /*getShops() {
    	return this.filteredShops;
    }*/

    /*getShops() {
    	return this.subjectShops.asObservable();
    }*/



  	loadShops( location ) {
  		this.userLocation = location;
  		this.apicallService.get( this.apilink + "shops", (r) => {
  			this.shops = r;
  			this.getGeocoding( this.userLocation, (r:any) => {
  				this.userLocationLatLng = r;

  				for (let i = 0; i < this.shops.length; i++) {
  					let adress = this.shops[i].street + ", " + this.shops[i].number + ", " +  this.shops[i].postalCode + ", " + this.shops[i].city;
	  				this.getGeocoding( adress, (r) => {
	  					this.shops[i].latlng = r;
	  				});
	  			}

	  			this.getDistances( (r) => {
					for (let i = 0; i < this.shops.length; i++) {
						this.shops[ i ].distance = r.rows[0].elements[ i ].distance.value;
					}

					this.filterShops( this.filterParam );

					this.filteredShops.sort(this.compare('distance'));

					this.zone.run(() => {});
				});
  			});
  		});
	}

	getDistances( cb:any ) {
		let destinations:string[] = [];

		for (let i = 0; i < this.shops.length; i++) {
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

	getGeocoding( adres:any, cb:any ) {
		this.apicallService.get( "https://maps.googleapis.com/maps/api/geocode/json?address=" + adres + "&key=" + this.googleApiKey, (r:any) => {
			cb( r.results[0].geometry.location );
		});
	}

	compare(param) {
		return function(a,b) {
			if (a[param] < b[param])
	    		return -1;
	  		if (a[param] > b[param])
	    		return 1;
	  		return 0;
		}
	}

	getProducts( id, cb:any ) {
		this.apicallService.get( this.apilink + "products/" + id, (r:any) => {
			if( r ) { r.sort( this.compare( 'product_name' ) ) };
			cb(r);
		}, (error) => { });
	}

	addToCart( shop_id, order ) {
		if ( Object.keys(order).length > 0 ) {

			if( !this.maxPrice && !this.maxProducts ) {

				if( this.cart[ shop_id ] ) {
					let old_amount = this.cart[shop_id].products.length;

					order.id = (this.cart[shop_id]['products'].length + 1);

					this.cart[ shop_id ]['products'].push( order );

					let price = order.total_price + this.cart[shop_id].total_price;

					if ( ( old_amount < this.cart[shop_id].products.length ) && ( price < 50 ) && ( this.cart[shop_id].total_products < 15 ) ) {
						this.cart[ shop_id ].total_price += order.total_price;
						this.cart[ shop_id ].total_products++;
						localStorage.setItem( 'cart', JSON.stringify(this.cart) );
						return true;
					}
					else if( price >= 50 ) {
						this.maxPrice = true;
						return false;
					}
					else if( this.cart[shop_id].total_products >= 15 ) {
						this.maxProducts = true;
						return false;
					}
					else {
						return false;
					}
				} else {
					if( order.total_price <= 50 ) {
						this.cart[ shop_id ] = {
							'total_price': 0,
							'total_products': 0,
							'products': []
						};

						order.id = 1;
						this.cart[ shop_id ]['products'].push( order );

						if ( this.cart[ shop_id ].products.length ) {
							this.cart[ shop_id ].total_price += order.total_price;
							this.cart[ shop_id ].total_products++;
							localStorage.setItem( 'cart', JSON.stringify(this.cart) );
							return true;
						}
						else {
							return false;
						}
					}
					else {
						return false;
					}
				}
			}
		}
	}

	removeFromCart( shop_id ) {
		delete this.cart[shop_id];
		localStorage.setItem( 'cart', JSON.stringify(this.cart) );
	}

	removeItemCart( shop_id, product_id, price ) {
		let index = this.cart[shop_id]['products'].findIndex( (r) => r.id == product_id );
		this.cart[ shop_id ]['products'].splice( index, 1 );

		this.cart[ shop_id ].total_price -= price;
		this.cart[ shop_id ].total_products--;

		if( this.cart[shop_id].total_products < 15 ) {
			this.maxProducts = false;
		}

		if( this.cart[shop_id].total_price < 50 ) {
			this.maxPrice = false;
		}

		if( this.cart[ shop_id ].total_products == 0 ) {
			delete this.cart[ shop_id ];
		}

		localStorage.setItem( 'cart', JSON.stringify(this.cart) );
	}

	setSearchView( view ) {
		this.searchView = view;
	}

	filterShops( param ) {

		this.filterParam = param.toLowerCase();

		if(param !== 'all') {
			this.filteredShops = this.shops.filter(shop => shop.type.toLowerCase() === param.toLowerCase());
		} else {
			this.filteredShops = this.shops;
		}

	}
}
