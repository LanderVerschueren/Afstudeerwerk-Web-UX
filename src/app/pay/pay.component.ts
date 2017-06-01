import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pay-component',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		console.log( params );
  	});
  }

}
