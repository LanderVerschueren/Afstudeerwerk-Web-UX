import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
            'email': [null, Validators.compose([Validators.required, this.isValidMailFormat])],
            'password': [null, Validators.required]
        })
    }
 
    ngOnInit() {
        this.generalService.logout();
    }

    isValidMailFormat(control: FormControl){
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (!EMAIL_REGEXP.test(control.value)) {
            return { "emailNotValid": true };
        }

        return null;
    }
 
    login(value: any, valid: boolean) {
        if( valid ) {
            this.loading = true;
            this.generalService.login(value.email, value.password, (r) => {
            	if( r.token ) {
            		this.generalService.getUser( (res) => {
            			if( res ) {
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

        else {
            let controls = this.loginForm.controls;

            for( let control in controls ) {
                controls[control].markAsTouched();
            }
        }
    }

}
