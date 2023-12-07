import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCartPageRoutingModule } from './my-cart-routing.module';

import { MyCartPage } from './my-cart.page';
import {CartIconPageModule} from '../cart-icon/cart-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCartPageRoutingModule,
    CartIconPageModule
  ],
  declarations: [MyCartPage]
})
export class MyCartPageModule {}
