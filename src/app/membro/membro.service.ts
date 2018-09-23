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

  buscarPorId(id: string) {
    return this.http.get<Membro>(`${this.url}/${id}`);
  }

  salvar(dados: Membro): Observable<Membro> {
  	return this.http.post<Membro>(this.url, dados);
  }

  editar(dado: Membro): Observable<Membro> {
    return this.http.put<Membro>(this.url, dado);
  }

  remover(id: string) {
     return this.http.delete<any>(`${this.url}/${id}`);
  }

}
