import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	id:number;
	products:any;

  	constructor( private route: ActivatedRoute, private generalService : GeneralService ) { }

  	ngOnInit() {
  		this.route.params.subscribe(params => {
	    	if (params['id']) {
	    		this.id = params['id'];
	    		console.log( this.id );

	    		this.products = this.generalService.getProducts( this.id, (r:any) => {
	    			
	    			console.log(r);
	    			this.products = r;
	    		});
	    	}
		});
 	}

}
