import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  	{	path: '', 			component: HomeComponent			},
  	{	path: 'search', 	component: SearchComponent			},
  	{	path: 'home', 		component: HomeComponent			},
  	{	path: '404', 		component: PagenotfoundComponent	},
	{	path: '**', 		redirectTo: '/404'					}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
