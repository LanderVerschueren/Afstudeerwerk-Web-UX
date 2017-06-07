import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'category-component',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ DetailComponent ]
})
export class CategoryComponent implements OnInit {

	@Input() categories;
	@Output() catChange:EventEmitter<string> = new EventEmitter<string>();

	constructor(private detailComponent: DetailComponent) { }

	ngOnInit() {
	}

	selectCategory(cat:string) {
		this.catChange.emit(cat);
	}

}
