import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GeneralService } from '../services/general.service';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'resetpassword-component',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    resetForm: FormGroup;
    token:string;
    error:boolean = false;
    success:boolean = false;
 
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private generalService: GeneralService,
        private location : Location,
        private fb: FormBuilder,
        private zone: NgZone,
        private apicallService: ApicallService
    ) {
        this.resetForm = fb.group ({
            'password': [null, Validators.required]
        })
    }
 
    ngOnInit() {
    	this.route.queryParams.subscribe( (params) => {
    		if( params ) {
    			this.token = params['token'];
    		}
    	});
    }

    reset( value:any, valid:any ) {
    	this.apicallService.post( this.generalService.apilink + "resetChange", { 'token': this.token, 'password': value.password }, (r) => { this.success = true; }, (error) => { this.error = true; });
    }
}
