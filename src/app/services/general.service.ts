import { Injectable } from '@angular/core';

import { ApicallService } from './apicall.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeneralService {

	public token: string;
	public loggedIn:boolean;
	public loggedInUser: Array<any>;
	apilink:string = "http://localhost:8888/eindwerk/Afstudeerwerk-Web-UX/back-end/public/api/";

  	constructor( private apicallService : ApicallService, private http: Http ) {
  		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if( this.token ) {
        	this.getUser( (r:any) => {});
        }
  	}

  	login(email: string, password: string, cb:any) {
        this.apicallService.post( this.apilink + 'authenticate', { email: email, password: password }, (r:any) => {
        	if( r.token ) {
        		this.token = r && r.token;
        		localStorage.setItem('currentUser', JSON.stringify({ email: email, token: this.token }));

        		cb( r )
        	}
        	else {
        		cb( r );
        	}
        });
    }

    getUser( cb:any ) {
    	this.apicallService.get( this.apilink + 'user?token=' + this.token, (r:any) => {
			if ( r.user ) {
				this.loggedInUser = r.user;
				this.loggedIn = true;

				cb( r );
			}
			else {
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

  	getShops( cb:any ) {
  		this.apicallService.get( this.apilink + "shops", (r:any) => {
  			cb(r);
  		});
	}

	getProducts( id, cb:any ) {
		this.apicallService.get( this.apilink + "products/" + id, (r:any) => {
			cb(r);
			return r;
		} );
	}
}
