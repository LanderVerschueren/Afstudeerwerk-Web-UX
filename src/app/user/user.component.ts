import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	tab:string = 'gegevens';

  constructor() { }

  ngOnInit() {
  }

  changeTab( param ) {
  	this.tab = param;
  }

}
