import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	subscription: Subscription;

  	constructor( private route: ActivatedRoute, private generalService : GeneralService ) { }

  	ngOnInit() {
  		this.route.params.subscribe(params => {
	    	if (params['id']) {
	    		this.id = params['id'];

	    		this.products = this.generalService.getProducts( this.id, (r:any) => {
	    			this.products = r;
	    		});
	    	}
		});

		//this.subscription = this.generalService.getCart().subscribe(cart => { this.cart = cart; });
 	}
 	
}
