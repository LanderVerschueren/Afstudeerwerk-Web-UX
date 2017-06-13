import { Component, OnInit, AfterViewInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	navShowing:boolean = false;
	name:string;

	constructor( private generalService: GeneralService ) { }

	ngOnInit() {}

	toggleDisplayNav(e) {
 		if( !this.navShowing ) {
 			this.navShowing = true;
 			document.body.className += 'no_scroll';
 		} else if ( this.navShowing ) {
 			this.navShowing = false;
 			document.body.className = document.body.className.replace("no_scroll","");
 		}
 	}
}
