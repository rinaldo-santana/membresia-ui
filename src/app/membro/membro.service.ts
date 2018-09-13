import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders} from '@angular/common/http'; 
import {Membro} from './membro.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  url = 'http://127.0.0.1:3000/api/membros';

  constructor(private http: HttpClient) { }



  buscarTodos() {
  	return this.http.get<Membro[]>(this.url);
  }

  salvar(dados: Membro): Observable<Membro> {
  	console.log('>>> service: ', dados);
  	return this.http.post<Membro>(this.url, dados);
  }

}
