import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactoryAuthPageRoutingModule } from './two-factory-auth-routing.module';

import { TwoFactoryAuthPage } from './two-factory-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoFactoryAuthPageRoutingModule
  ],
  declarations: [TwoFactoryAuthPage]
})
export class TwoFactoryAuthPageModule {}
