import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CartIconPageRoutingModule} from './cart-icon-routing.module';

import {CartIconPage} from './cart-icon.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CartIconPageRoutingModule
    ],
    exports: [
        CartIconPage
    ],
    declarations: [CartIconPage]
})
export class CartIconPageModule {}
