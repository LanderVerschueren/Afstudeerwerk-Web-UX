import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tabs-component',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
	view:string = 'list';
	
  constructor() { }

  ngOnInit() {
  }

  changeTab(event) {
  	event.stopPropagation();
  	this.view == 'list' ? this.view = 'map' : this.view = 'list';
  }
}
