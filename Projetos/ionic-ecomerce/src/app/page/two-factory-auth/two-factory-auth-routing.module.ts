import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoFactoryAuthPage } from './two-factory-auth.page';

const routes: Routes = [
  {
    path: '',
    component: TwoFactoryAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoFactoryAuthPageRoutingModule {}
