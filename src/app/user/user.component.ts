import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor( private apicallService: ApicallService, private generalService : GeneralService, private router : Router ) { }

  ngOnInit() {
  	this.generalService.getUser( (res) => {
		if( res ) {
			this.user = res;

			if( this.user.role == 'shop' ) {
				this.name = this.user.name;
			}
			else {
				this.name = this.user.firstName + " " + this.user.lastName;
			}

			this.generalService.getOrders( (res) => {
				this.orders = res;
			});
		}
		else {
			this.router.navigate(['login']);
		}
	});
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
  		}, (error) => {console.log( error )});
	}
  }
}
