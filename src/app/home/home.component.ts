import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ApicallService } from '../services/apicall.service';

declare var google:any;

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	pos:any = {};

  constructor(private apicallService: ApicallService) { }

  ngOnInit() {}

  ngAfterViewInit() {}
}
