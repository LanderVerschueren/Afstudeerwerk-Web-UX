import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchinputComponent } from './searchinput/searchinput.component';
import { HowtoComponent } from './howto/howto.component';
import { HighlightComponent } from './highlight/highlight.component';
import { HowtosectionComponent } from './howtosection/howtosection.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { ShopComponent } from './shop/shop.component';
import { DetailComponent } from './detail/detail.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ApicallService } from './services/apicall.service';
import { GeneralService } from './services/general.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchinputComponent,
    HowtoComponent,
    HighlightComponent,
    HowtosectionComponent,
    PagenotfoundComponent,
    SearchComponent,
    FilterComponent,
    TabsComponent,
    ListComponent,
    MapComponent,
    ShopComponent,
    DetailComponent,
    ProductComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [
    ApicallService,
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
