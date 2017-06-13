import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

	showTabs:boolean = true;
	showFilter:boolean = true;
	windowWidth: number = window.innerWidth;

	constructor( private generalService : GeneralService ) { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.windowWidth = window.innerWidth;

		if( this.windowWidth <= 649 ) {
			this.showTabs = false;
			this.showFilter = false;
		}
	}

	//if screen size changes it'll update
	@HostListener('window:resize', ['$event'])
		resize(event) {
		this.windowWidth = window.innerWidth;

		if( this.windowWidth <= 649 ) {
			this.showTabs = false;
			this.showFilter = false;
		}

		if( this.windowWidth > 649 ) {
			this.showTabs = true;
			this.showFilter = true;
		}
	}

	toggleOverlay( param ) {
		if( this.windowWidth <= 599 ) {
			if( param == 'filter' ) {
				( this.showFilter ) ? this.showFilter = false : this.showFilter = true;
			}

			if( param == 'view' ) {
				( this.showTabs ) ? this.showTabs = false : this.showTabs = true;
			}
		}
	}

}
