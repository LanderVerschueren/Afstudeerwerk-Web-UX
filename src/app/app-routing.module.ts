import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  	{	path: '', 		component: HomeComponent},
  	{	path: 'home', 	component: HomeComponent},
  	{	path: '404', 	component: PagenotfoundComponent},
	{	path: '**', 	redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
