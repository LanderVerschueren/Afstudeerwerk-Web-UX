import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	view:string = 'list';

  constructor() { }

  ngOnInit() {
  }

}
