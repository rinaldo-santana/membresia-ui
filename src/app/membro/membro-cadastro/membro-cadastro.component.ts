import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {MembroService} from '../membro.service';
import {Membro} from '../membro.model';

@Component({
  selector: 'app-membro-cadastro',
  templateUrl: './membro-cadastro.component.html',
  styleUrls: ['membro-cadastro.component.css']
})
export class MembroCadastroComponent implements OnInit {

  @Input() membroSelecionado: Membro;

  dadosResposta: any;

  telefonePattern = /^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})/;

  membroCadastroForm = new FormGroup ({
    id: new FormControl(''),
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(this.telefonePattern)]),
    dataNascimento: new FormControl('', Validators.required)
  });



  // membroCadastroForm = this.fb.group({
  //   nome: [''],
  //   email: [''],
  //   telefone: [''],
  //   dataNascimento: ['']
  // });

  constructor(public membroService: MembroService, public router: Router,  public route: ActivatedRoute) { }

  ngOnInit() {
    this.onEdit();
  }

  onSubmit() {

    if (!(this.membroCadastroForm.get('id').value > 0)) {
         return this.membroService.salvar(this.membroCadastroForm.value)
             .subscribe((dado: Membro) => {
                 this.dadosResposta = dado;
                 let insertId = parseInt(this.dadosResposta.insertId);
                 let ok = insertId > 0;
                 if (ok) 
                   this.router.navigate(['/membros']);         
             })
  
    } else {
        return this.membroService.editar(this.membroCadastroForm.value)
              .subscribe((dado: Membro) => {
                 this.dadosResposta = dado;
                 let changedRows = parseInt(this.dadosResposta.changedRows);
                 let ok = changedRows > 0;
                 if (ok) 
                   this.router.navigate(['/membros']);                    
              })
    }

  }

  onEdit(){
  return this.membroService.buscarPorId(this.route.snapshot.params['id'])
    .subscribe((dado: Membro) => {
      this.membroSelecionado = dado; 
      this.membroCadastroForm.get('id').setValue(dado[0].id);
      this.membroCadastroForm.get('nome').setValue(dado[0].nome);
      this.membroCadastroForm.get('email').setValue(dado[0].email);
      this.membroCadastroForm.get('telefone').setValue(dado[0].telefone);
      this.membroCadastroForm.get('dataNascimento').setValue( this.formataData(dado[0].data_nascimento) );
    })
  };


  formataData(data: string): string {
      let dataBr = new Date(data).toLocaleDateString('pt-Br');
      let dataArray = dataBr.split('/');
      let dataFormata = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
      return dataFormata;
  }

}
