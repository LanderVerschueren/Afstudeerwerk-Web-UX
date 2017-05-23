import { Component, OnInit } from '@angular/core';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private generalService: GeneralService ) { }

  ngOnInit() {
  }

}
