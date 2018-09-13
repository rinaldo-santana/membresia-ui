import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {MembroService} from '../membro.service';
import {Membro} from '../membro.model';

@Component({
  selector: 'app-membro-cadastro',
  templateUrl: './membro-cadastro.component.html',
  styleUrls: ['membro-cadastro.component.css']
})
export class MembroCadastroComponent implements OnInit {

  dadosResposta: any;

  telefonePattern = /^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})/;

  membroCadastroForm = new FormGroup ({
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

  constructor(public membroService: MembroService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
   return this.membroService.salvar(this.membroCadastroForm.value)
       .subscribe((dado: Membro) => {
             this.dadosResposta = dado;
             let insertId = parseInt(this.dadosResposta.insertId);
             let ok = insertId > 0;
             if (ok) 
               this.router.navigate(['/membros']);         
       })
  }
}
