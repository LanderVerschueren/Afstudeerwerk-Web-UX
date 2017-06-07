import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';
import { MapComponent } from '../map/map.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'tabs-component',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [MapComponent]
})
export class TabsComponent implements OnInit {

	view:string = 'list';
  windowWidth:number;
	
  constructor( private generalService : GeneralService, private mapComponent: MapComponent, private searchComponent: SearchComponent ) { }

  ngOnInit() {
    this.windowWidth = this.searchComponent.windowWidth;
  }

  changeTab(event, view) {
  	event.stopPropagation();
  	this.generalService.setSearchView( view );

    this.searchComponent.toggleOverlay( 'view' );
  }
}
