import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '@angular/common';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { GeneralService } from '../services/general.service';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	tab:string = 'gegevens';
	user:any;
	orders:any;
	name:string;
	productSuccess:boolean = false;
  userchange:boolean = false;
  registerForm: FormGroup;
  p: number = 1;

  constructor( 
    private apicallService: ApicallService, 
    private generalService : GeneralService, 
    private router : Router,
    private fb: FormBuilder,
    private location: Location,
    private zone: NgZone
    ){
      this.registerForm = fb.group({
        'firstName': [null, Validators.required],
        'lastName': [null, Validators.required],
        'email': [null, Validators.compose([Validators.required, this.isValidMailFormat])],
        'phonenumber' : [null, Validators.required]
     })
  }

  ngOnInit() {
  	this.generalService.getUser( (res) => {
  		if( res ) {
  			this.user = res;

  			if( this.user.role == 'shop' ) {
  				this.name = this.user.name;
  			}
  			else {
  				this.name = this.user.firstName + " " + this.user.lastName;

          this.registerForm.controls['firstName'].setValue( this.user['firstName'] );
          this.registerForm.controls['lastName'].setValue( this.user['lastName'] );
          this.registerForm.controls['email'].setValue( this.user['email'] );
          this.registerForm.controls['phonenumber'].setValue( this.user['phonenumber'] );
  			}

  			this.generalService.getOrders( (res) => {
          res.sort( this.compare( 'created_at' ) );
  				this.orders = res;
  			});
  		}
  		else {
  			this.router.navigate(['login']);
  		}
  	});
  }

  compare(param) {
    return function(a,b) {
      if (a[param] > b[param])
          return -1;
        if (a[param] < b[param])
          return 1;
        return 0;
    }
  }

  isValidMailFormat(control: FormControl){
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      if (!EMAIL_REGEXP.test(control.value)) {
          return { "emailNotValid": true };
      }

      return null;
  }

  changeTab( param ) {
  	this.tab = param;
  }

  fileUpload( event ) {
  	let fileList:FileList = event.target.files;

  	if( fileList.length > 0 ) {
  		let file: File = fileList[0];
  		let formData: FormData = new FormData();
  		formData.append('file', file, file.name);
  		formData.append('id', this.user.id);

  		this.apicallService.post( this.generalService.apilink + "storeProducts", formData, (r) => {
  			if( r.message ) {
  				this.productSuccess = true;
  			}
  		}, (error) => { this.productSuccess = false; });
	  }
  }

  change() {
    ( this.userchange == true ) ? this.userchange = false : this.userchange = true;
  }

  changeUser( value:any, valid:any ) {
    if( valid ) {
      this.apicallService.post( this.generalService.apilink + "userChange", {'info': value, 'user': this.user}, (r) => {
          if( r.message == true ) {
            window.location.reload();
          }
        }, (error) => { console.log( error ) });
    }
  }
}
