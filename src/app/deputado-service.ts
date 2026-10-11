import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Deputado } from './deputado';

@Injectable({ providedIn: 'root' })
export class DeputadoService {
  private readonly apiUrl = 'https://dadosabertos.camara.leg.br/api/v2/deputados';

  constructor(private http: HttpClient) {}

  // Lista todos os deputados (se você já tinha um método igual, mantenha o seu)
  listarTodos(): Observable<Deputado[]> {
    const params = new HttpParams().set('ordem', 'ASC').set('ordenarPor', 'nome');
    return this.http
      .get<{ dados: Deputado[] }>(this.apiUrl, { params })
      .pipe(map((resposta) => resposta.dados));
  }

  // Consulta com parâmetro: busca deputados pela sigla do partido
  buscarPorPartido(sigla: string): Observable<Deputado[]> {
    const params = new HttpParams()
      .set('siglaPartido', sigla.trim().toUpperCase())
      .set('itens', '100')
      .set('ordem', 'ASC')
      .set('ordenarPor', 'nome');

    return this.http
      .get<{ dados: Deputado[] }>(this.apiUrl, { params })
      .pipe(map((resposta) => resposta.dados));
  }
}