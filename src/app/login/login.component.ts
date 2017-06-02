import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading = false;
    error = '';
    loginForm: FormGroup;
 
    constructor(
        private router: Router,
        private generalService: GeneralService,
        private location : Location,
        private fb: FormBuilder
    ) {
        this.loginForm = fb.group ({
            'email': [null, Validators.required],
            'password': [null, Validators.required]
        })
    }
 
    ngOnInit() {
        this.generalService.logout();
    }
 
    login(value: any) {
        this.loading = true;
        this.generalService.login(value.email, value.password, (r) => {
        	if( r.token ) {
        		this.generalService.getUser( (res) => {
        			if( res.user ) {
        				this.location.back();
        			}
        			else {
        				this.error = res;
        			}
        		});
        	}
        	else {
        		this.error = 'De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend.';
        	}
        });
    }

}
