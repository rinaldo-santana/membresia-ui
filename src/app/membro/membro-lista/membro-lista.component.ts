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

