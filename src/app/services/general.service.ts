import { Injectable } from '@angular/core';

import { ApicallService } from './apicall.service';

import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class GeneralService {

	public token: string;
	apilink:string = "http://localhost:8888/eindwerk/back-end/public/api/";

  	constructor( private apicallService : ApicallService, private http: Http ) {
  		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
  	}

  	login(username: string, password: string, cb:any) {
        /*return this.http.post( this.apilink + 'authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
 
                    // return true to indicate successful login
                    console.log( this.token );
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });*/

        this.apicallService.post( this.apilink + 'authenticate', { email: username, password: password }, (r:any) => {
        	console.log( r );
        	cb(r);
        });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
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
