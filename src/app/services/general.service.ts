import { Injectable } from '@angular/core';

import { ApicallService } from './apicall.service';

@Injectable()
export class GeneralService {

	apilink:string = "http://localhost:8888/eindwerk/Afstudeerwerk-Web-UX/back-end/public/";

  	constructor( private apicallService : ApicallService ) { }

  	getShops( cb:any ) {
  		this.apicallService.get( this.apilink + "shops", (r:any) => {
  			cb(r);
  			return r;
  		});
	}

	getProducts( id, cb:any ) {
		this.apicallService.get( this.apilink + "products/" + id, (r:any) => {
			cb(r);
			return r;
		} );
	}
}
