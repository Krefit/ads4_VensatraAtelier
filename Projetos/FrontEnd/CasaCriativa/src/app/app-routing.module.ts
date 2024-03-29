import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FornecedoresListComponent } from './fornecedores/fornecedores-list/fornecedores-list.component';
import { SettingsComponent } from './configuracoes/configuracoes.component';
import { StatisticsComponent } from './material/material.component';
import {ClienteListComponent} from "./cliente/cliente-list/cliente-list.component";
import { ProdutoListComponent } from './produtos/produto-list/produto-list.component';
import { MaterialListComponent } from './material/material-list/material-list.component';

import {OrcamentoListComponent} from "./orcamento/orcamento-list/orcamento-list.component";




const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'produtos', component: ProdutoListComponent},
  {path: 'material', component: MaterialListComponent},
  {path: 'orcamento', component: OrcamentoListComponent},
  {path: 'fornecedores', component: FornecedoresListComponent},
  {path: 'orcamento', component: OrcamentoListComponent},
  {path: 'configuracoes', component: SettingsComponent},
  {path: 'cliente', component: ClienteListComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
