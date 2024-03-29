import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SettingsComponent } from './configuracoes/configuracoes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FornecedoresListComponent } from './fornecedores/fornecedores-list/fornecedores-list.component';
import { StatisticsComponent } from './material/material.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FornecedorEditarComponent } from './fornecedores/fornecedor-editar/fornecedor-editar.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClienteEditarComponent } from './cliente/cliente-editar/cliente-editar.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ProdutoEditarComponent } from './produtos/produto-editar/produto-editar.component';
import { ProdutoListComponent } from './produtos/produto-list/produto-list.component';
import { MaterialEditarComponent } from './material/material-editar/material-editar.component';
import { MaterialListComponent } from './material/material-list/material-list.component';
import { OrcamentoEditarComponent } from './orcamento/orcamento-editar/orcamento-editar.component';
import { OrcamentoListComponent } from './orcamento/orcamento-list/orcamento-list.component';
import {MatExpansionModule} from '@angular/material/expansion';







@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    StatisticsComponent,
    FornecedoresListComponent,
    SettingsComponent,
    FornecedorEditarComponent,
    ClienteEditarComponent,
    ClienteListComponent,
    ProdutoEditarComponent,
    ProdutoListComponent,
    MaterialEditarComponent,
    MaterialListComponent,

    OrcamentoEditarComponent,
    OrcamentoListComponent,




  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent/*,CommonModule*/],
})
export class AppModule {
}

