import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  	{	path: '', 			component: HomeComponent			},
  	{	path: 'search', 	component: SearchComponent			},
  	{	path: 'detail', 	component: DetailComponent			},
  	{	path: 'home', 		component: HomeComponent			},
  	{	path: '404', 		component: PagenotfoundComponent	},
	{	path: '**', 		redirectTo: '/404'					}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
