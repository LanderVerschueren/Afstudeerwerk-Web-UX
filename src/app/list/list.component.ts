import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	shops:any;

  constructor( private generalService : GeneralService ) { }

  ngOnInit() {
  	this.generalService.getShops( (r) => {
  		console.log( r );
  		this.shops = r;
  	});
  }

}
