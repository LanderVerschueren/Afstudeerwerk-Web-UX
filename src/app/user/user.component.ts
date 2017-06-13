import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	tab:string = 'gegevens';
	user:any;
	orders:any;
	name:string;

  constructor( private generalService : GeneralService, private router : Router ) { }

  ngOnInit() {
  	this.generalService.getUser( (res) => {
		if( res.user ) {
			this.user = res.user;

			if( this.user.role == 'shop' ) {
				this.name = this.user.name;
			}
			else {
				this.name = this.user.firstName + " " + this.user.lastName;
			}

			this.generalService.getOrders( (res) => {
				this.orders = res;

				this.orders.sort(this.generalService.compare('created_at'));
			});
		}
		else {
			this.router.navigate(['login']);
		}
	});
  }

  changeTab( param ) {
  	this.tab = param;
  }
}
