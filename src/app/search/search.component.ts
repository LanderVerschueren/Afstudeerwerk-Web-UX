import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor( private generalService : GeneralService ) { }

  ngOnInit() {
  }

}
