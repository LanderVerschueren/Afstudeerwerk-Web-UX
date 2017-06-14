import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	model: any = {};
  loading = false;
  success = false;
  registerForm: FormGroup;
  error:string;

  constructor(
    private generalService : GeneralService,
    private fb: FormBuilder
   ) {
    this.registerForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, this.isValidMailFormat])],
      'phonenumber' : [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
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

  register(value: any, valid: boolean) {
    if( valid ) {
      this.loading = true;
      this.generalService.register( value, (r:any) => {
        if ( r.message == true ) {
          this.loading = false;
          this.success = true;
        }
        else if( r.error.customMessages.email === 'duplicate' ) {
          this.error = "Dit e-mailadres werd al eens gebruikt";
          this.loading = false;
        }
        else {
          this.error = "Er ging iets verkeerd, probeer opnieuw!";
          this.loading = false;
        }
      });
    }

    else {
      let controls = this.registerForm.controls;

      for( let control in controls ) {
        controls[control].markAsTouched();
      }
    }
  }
}
