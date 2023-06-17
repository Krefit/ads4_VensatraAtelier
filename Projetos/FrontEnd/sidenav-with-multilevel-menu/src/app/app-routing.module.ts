import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FornecedoresListComponent } from './fornecedores/fornecedores-list/fornecedores-list.component';
import { PagesComponent } from './cliente/cliente.component';
import { SettingsComponent } from './configuracoes/configuracoes.component';
import { StatisticsComponent } from './material/material.component';
import { OrcamentosComponent } from './orcamento/orcamento.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './login/login/authGuard';



    const routes: Routes = [

      {
        path: '', pathMatch: 'full',
        redirectTo: 'login'
        }
        ,
        {
          path: 'login', component: LoginComponent
        },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.module').then(m => m.ProductsModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'material',
        component: StatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orcamento',
        component: OrcamentosComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'cliente',
        component: PagesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fornecedores',
        component: FornecedoresListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'configuracoes',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      }
    // ];


  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {path: 'dashboard', component: DashboardComponent},
  // {
  //   path: 'produtos',
  //   loadChildren: () => import('./produtos/produtos.module').then(m => m.ProductsModule)
  // },
  // {path: 'material', component: StatisticsComponent},
  // {path: 'orcamento', component: OrcamentosComponent},
  // {path: 'cliente', component: PagesComponent},
  // {path: 'fornecedores', component: FornecedoresListComponent},
  // {path: 'configuracoes', component: SettingsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
