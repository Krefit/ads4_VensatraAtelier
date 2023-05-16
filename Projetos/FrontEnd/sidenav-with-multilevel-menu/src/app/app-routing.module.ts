import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoupensComponent } from './orcamento/orcamento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { PagesComponent } from './cliente/cliente.component';
import { SettingsComponent } from './configuracoes/configuracoes.component';
import { StatisticsComponent } from './material/material.component';
import { ProdutosComponent } from './produto/produtos.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'material', component: StatisticsComponent},
  {
    path: 'orcamento',
    loadChildren: () => import('./orcamento/orcamento.module').then(m => m.CoupensModule)
  },
  {path: 'cliente', component: PagesComponent},
  {path: 'fornecedores', component: FornecedoresComponent},
  {path: 'configuracoes', component: SettingsComponent},
  {path: 'precificacao', component: ProdutosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
