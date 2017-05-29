import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor( private generalService : GeneralService, private zone: NgZone ) { }

  ngOnInit() {
  	this.generalService.loadShops();
  }
}
