import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketPageComponent } from './market-page/market-page.component';


@NgModule({
  declarations: [
    MarketPageComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
