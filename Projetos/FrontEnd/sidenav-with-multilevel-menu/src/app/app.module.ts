import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { PagesComponent } from './cliente/cliente.component';
import { SettingsComponent } from './configuracoes/configuracoes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { StatisticsComponent } from './material/material.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { ProdutosComponent } from './produto/produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    PagesComponent,
    FornecedoresComponent,
    SettingsComponent,
    SublevelMenuComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
