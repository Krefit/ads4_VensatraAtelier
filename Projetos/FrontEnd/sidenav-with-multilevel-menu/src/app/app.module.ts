import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CoreServiceComponent } from './core-service/core-service.component';



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
    CoreServiceComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,




  ],
  providers: [],
  bootstrap: [AppComponent,CommonModule],
})
export class AppModule { }
export class MyComponentModule { }
export class FormFieldOverviewExample {}

