import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/components/common/shared';
import {InputTextModule} from 'primeng/inputtext';


import { AppComponent } from './app.component';

import {MembroCadastroComponent} from './membro/membro-cadastro/membro-cadastro.component';
import {MembroListaComponent} from './membro/membro-lista/membro-lista.component';
import {MembroService} from './membro/membro.service';


const appRoutes: Routes = [
  {path: '', redirectTo: '/membros', pathMatch: 'full'},
  {path: 'membros', children: [
    {path: '', component: MembroListaComponent},
    {path: 'cadastro', component: MembroCadastroComponent}
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MembroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
