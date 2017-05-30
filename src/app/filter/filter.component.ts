import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [MapComponent]
})
export class FilterComponent implements OnInit {
	filterCategory:string = 'all';

  constructor( private generalService: GeneralService, private mapComponent: MapComponent ) { }

  ngOnInit() {
  }

  changeFilter(event, category) {
  	switch(category) {
  		case 'all':
  			this.generalService.filterShops( 'all' );
        this.filterCategory = 'all';
  			break;
  		case 'beenhouwer':
  			this.generalService.filterShops( 'Beenhouwerij' );
        this.filterCategory = 'beenhouwerij';
  			break;
  		case 'bakker':
  			this.generalService.filterShops( 'Bakkerij' );
        this.filterCategory = 'bakkerij';
  			break;
  	}

    if( this.generalService.searchView == 'map' ) {
      this.mapComponent.updateMarkers();
    }
  }
}
