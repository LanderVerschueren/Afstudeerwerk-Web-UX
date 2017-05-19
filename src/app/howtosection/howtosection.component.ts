import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'howtosection-component',
  templateUrl: './howtosection.component.html',
  styleUrls: ['./howtosection.component.scss']
})
export class HowtosectionComponent implements OnInit {

	private image:string;
	private lead:string;
	private trail:string;
	@Input() info;

  constructor() { }

  ngOnInit() {
  	this.image = "assets/img/" + this.info['image'];
  	this.lead = this.info['lead'];
  	this.trail = this.info['trail'];
  }

}
