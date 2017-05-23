import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private generalService: GeneralService) { }
 
    ngOnInit() {
        // reset login status
        this.generalService.logout();
    }
 
    login() {
        this.loading = true;
        this.generalService.login(this.model.username, this.model.password, (r) => {
        	console.log( r );
        });
    }

}
