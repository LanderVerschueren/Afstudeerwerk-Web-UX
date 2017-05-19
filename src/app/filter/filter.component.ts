import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
	filterCategory:string = 'all';

  constructor() { }

  ngOnInit() {
  }

  changeFilter(event, category) {
  	switch(category) {
  		case 'all':
  			this.filterCategory = 'all';
  			break;
  		case 'beenhouwer':
  			this.filterCategory = 'beenhouwer';
  			break;
  		case 'bakker':
  			this.filterCategory = 'bakker';
  			break;
  	}
  }
}
