import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartIconPage } from './cart-icon.page';

const routes: Routes = [
  {
    path: '',
    component: CartIconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartIconPageRoutingModule {}
