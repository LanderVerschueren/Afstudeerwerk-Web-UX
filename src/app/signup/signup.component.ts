import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      'email': [null, Validators.required],
      'phonenumber' : [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit() {
  }

  register(value: any) {
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
}
