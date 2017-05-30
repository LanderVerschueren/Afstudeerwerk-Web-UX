import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'tabs-component',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  providers: [MapComponent]
})
export class TabsComponent implements OnInit {
	view:string = 'list';
	
  constructor( private generalService : GeneralService, private mapComponent:MapComponent ) { }

  ngOnInit() {}

  changeTab(event, view) {
  	event.stopPropagation();
  	this.generalService.setSearchView( view );
  }
}
