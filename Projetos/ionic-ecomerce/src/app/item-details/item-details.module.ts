import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPageRoutingModule } from './item-details-routing.module';

import { ItemDetailsPage } from './item-details.page';
import {CartIconPageModule} from '../cart-icon/cart-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailsPageRoutingModule,
    CartIconPageModule
  ],
  declarations: [ItemDetailsPage]
})
export class ItemDetailsPageModule {}
