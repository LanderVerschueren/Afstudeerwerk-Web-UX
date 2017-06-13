import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	location:string;

  constructor( private generalService : GeneralService, private zone: NgZone, private route: ActivatedRoute ) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
	    	if (params['location']) {
	    		this.location = params['location'];

          this.generalService.loadShops( this.location );
	    	}
		});
  }
}
