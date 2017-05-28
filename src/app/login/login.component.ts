import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
        private fb: FormBuilder
    ) {
        this.loginForm = fb.group ({
            'email': [null, Validators.required],
            'password': [null, Validators.required]
        })
    }
 
    ngOnInit() {
        // reset login status
        this.generalService.logout();
    }
 
    login(value: any) {
        console.log(value);
        this.loading = true;
        this.generalService.login(value.email, value.password, (r) => {
            console.log( r );
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
        		this.error = 'De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend.';
        	}
        });
    }

}
