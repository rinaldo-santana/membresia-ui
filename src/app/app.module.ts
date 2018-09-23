import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/components/common/shared';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ConfirmationService} from 'primeng/components/common/api'


import { AppComponent } from './app.component';

import {MembroCadastroComponent} from './membro/membro-cadastro/membro-cadastro.component';
import {MembroListaComponent} from './membro/membro-lista/membro-lista.component';
import {MembroService} from './membro/membro.service';


const appRoutes: Routes = [
  {path: '', redirectTo: '/membros', pathMatch: 'full'},
  {path: 'membros', children: [
    {path: '', component: MembroListaComponent},
    {path: 'cadastro', component: MembroCadastroComponent},
    {path: ':id', component: MembroCadastroComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    MembroCadastroComponent,
    MembroListaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTableModule,
    TableModule,
    InputTextModule,
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MembroService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
