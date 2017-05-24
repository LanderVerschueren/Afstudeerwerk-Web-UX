import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	model: any = {};

  constructor( private generalService : GeneralService ) { }

  ngOnInit() {
  }

  register() {
  	console.log(this.model);

  	this.generalService.register( this.model );
  }
}
