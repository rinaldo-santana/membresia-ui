import { Component, OnInit } from '@angular/core';
import { MembroService } from '../membro.service'
import {Membro} from '../membro.model';

@Component({
  selector: 'app-membro-lista',
  templateUrl: './membro-lista.component.html',
  styleUrls: ['./membro-lista.component.css']
})


export class MembroListaComponent implements OnInit {


  colunas = [];
  dados: Membro[] = [];
  membroSelecionado: any;

  constructor(public membroService: MembroService) { }

  ngOnInit() {
    this.membroSelecionado = {};
    this.colunas = [
      {header: 'Id', field: 'id'},
      {header: 'Nome', field: 'nome'},
      {header: 'Email', field: 'email'},
      {header: 'Telefone', field: 'telefone'},
      {header: 'Nascimento', field: 'dataNascimento'}
    ]; 
              
    this.mostrarTodos();
    // this.dados = [
    //   {id: '1', nome: 'Rinaldo', email: 'rinaldo@gmail.com', telefone: '83 98857-4899', dataNascimento: ''},
    //   {id: '2', nome: 'Marcos', email: 'marcos@gmail.com', telefone: '83 98853-1899', dataNascimento: ''},
    //   {id: '3', nome: 'Antonio', email: 'a@gmail.com', telefone: '83 98857-3899', dataNascimento: ''},
    //   {id: '4', nome: 'João', email: 'j@gmail.com', telefone: '83 98857-8599', dataNascimento: ''},
    //   {id: '5', nome: 'Marcelo', email: 'ax@gmail.com', telefone: '83 98847-7899', dataNascimento: ''},
    //   {id: '6', nome: 'José', email: 'jj@hotmail.com', telefone: '83 98557-8899', dataNascimento: ''},
    //   {id: '7', nome: 'André', email: 'aa@hotmail.com', telefone: '83 99957-8899', dataNascimento: ''},
    //   {id: '8', nome: 'Lucas', email: 'luc@gmail.com', telefone: '83 98786-7899', dataNascimento: ''}
    // ];
  }

  mostrarTodos() {
    this.membroService.buscarTodos()
      .subscribe((dados: Membro[]) => {this.dados = dados})
  };
}
