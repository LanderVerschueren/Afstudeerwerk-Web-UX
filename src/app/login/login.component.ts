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
        this.generalService.login(this.model.email, this.model.password, (r) => {
        	if( r.token ) {
        		this.generalService.getUser( (res) => {
        			if( res.user ) {
        				this.router.navigate(['']);
        			}
        			else {
        				this.error = res;
        			}
        		});
        	}
        	else {
        		this.error = r;
        	}
        	this.loading = false;
        });
    }

}
