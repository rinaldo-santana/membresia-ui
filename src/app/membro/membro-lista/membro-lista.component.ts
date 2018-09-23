import { Component, OnInit } from '@angular/core';
import { MembroService } from '../membro.service'
import {Membro} from '../membro.model';
import {Button} from 'primeng/components/button/button';
import {ConfirmationService} from 'primeng/components/common/api'
import {Router} from '@angular/router';

@Component({
  selector: 'app-membro-lista',
  templateUrl: './membro-lista.component.html',
  styleUrls: ['./membro-lista.component.css']
})


export class MembroListaComponent implements OnInit {

  colunas = [];

  dados: Membro[] = [];

  dadosResposta: any = {};

  constructor(private membroService: MembroService, 
              public router: Router,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.colunas = [
      {header: 'Id', field: 'id', filter: true},
      {header: 'Nome', field: 'nome', filter: true},
      {header: 'Email', field: 'email', filter: true},
      {header: 'Telefone', field: 'telefone', filter: true},
      {header: 'Nascimento', field: 'data_nascimento', filter: true},
      {header: 'Acoes', field: 'acoes', filter: false}
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


  confirm(membro: Membro) {
    this.confirmationService.confirm({
        message: `Voce deseja excluir <strong>${membro.nome}</strong>?`,
        header: 'Exclusão de Membro',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.membroService.remover(membro.id)
            .subscribe((dado: any) => {
              this.dadosResposta = dado;
              let affectedRows = parseInt(this.dadosResposta.affectedRows);
              let ok = (affectedRows > 0);
              if (ok){ 
                console.log('this.dados.indexOf(membro): ', this.dados.indexOf(membro));
                this.dados.splice(this.dados.indexOf(membro), 1);
              }
            })
        }
        // ,
        // reject: () => {
        //   console.log('no. reject. Não quero excluir')
        // }      
    });
  }

 }

