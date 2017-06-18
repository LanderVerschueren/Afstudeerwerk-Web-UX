import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { GeneralService } from '../services/general.service';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'reset-component',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

    resetForm: FormGroup;
    resetSend:boolean = false;
 
    constructor(
        private router: Router,
        private generalService: GeneralService,
        private location : Location,
        private fb: FormBuilder,
        private zone: NgZone,
        private apicallService: ApicallService
    ) {
        this.resetForm = fb.group ({
            'email': [null, Validators.compose([Validators.required, this.isValidMailFormat])]
        })
    }
 
    ngOnInit() {
    }

    isValidMailFormat(control: FormControl){
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (!EMAIL_REGEXP.test(control.value)) {
            return { "emailNotValid": true };
        }

        return null;
    }

    reset( value:any, valid:any ) {
    	this.apicallService.post( this.generalService.apilink + "reset", { 'email': value.email }, (r) => { 
            this.resetSend = true;
        }, (error) => {});
    }
}
