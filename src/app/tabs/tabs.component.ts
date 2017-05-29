import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'tabs-component',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
	view:string = 'list';
	
  constructor( private generalService : GeneralService ) { }

  ngOnInit() {}

  changeTab(event) {
  	event.stopPropagation();
  	this.view == 'list' ? this.view = 'map' : this.view = 'list';
  }
}
