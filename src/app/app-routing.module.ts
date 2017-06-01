import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent	} from './login/login.component';
import { SignupComponent	} from './signup/signup.component';
import { PayComponent } from './pay/pay.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  	{	path: '', 			            component: HomeComponent			        },
  	{	path: 'search/:location', 	component: SearchComponent			      },
  	{	path: 'detail',             component: DetailComponent			      },
  	{	path: 'home', 		          component: HomeComponent			        },
  	{	path: 'login', 		          component: LoginComponent			        },
  	{	path: 'signup', 	          component: SignupComponent			      },
    { path: 'pay',                component: PayComponent               },
    { path: 'user',               component: UserComponent              },
  	{	path: '404', 		            component: PagenotfoundComponent	    },
	  {	path: '**', 		            redirectTo: '/404'					          }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
