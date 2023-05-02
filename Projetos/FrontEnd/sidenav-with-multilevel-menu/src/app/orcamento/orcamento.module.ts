import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoupensRoutingModule } from './orcamento-routing.module';
import { CoupensComponent } from './orcamento.component';
import { CoupenListComponent } from './coupen-list/coupen-list.component';


@NgModule({
  declarations: [
    CoupensComponent,
    CoupenListComponent,
  ],
  imports: [
    CommonModule,
    CoupensRoutingModule
  ]
})
export class CoupensModule { }
