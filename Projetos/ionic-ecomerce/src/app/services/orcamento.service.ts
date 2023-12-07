import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrcamentoModel} from '../model/orcamento-model';

@Injectable({
    providedIn: 'root'
})
export class OrcamentoService {

    private readonly urlOrcamento = 'http://localhost:8080/api';

    constructor(
        private http: HttpClient
    ) {
    }

    obterDetalhesOrcamento(id: number): Observable<HttpResponse<OrcamentoModel[]>> {
        return this.http.get<OrcamentoModel[]>(`${this.urlOrcamento}/${id}/orcamento`, {observe: 'response'});
    }

    salvarOrcamento(orcamentoData: any, produtoSelecionados: any[], clienteSelecionado: any): Observable<any> {
        const payload = {
            orcamento: orcamentoData,
            produtos: produtoSelecionados,
            cliente: clienteSelecionado
        };
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<any>(`${this.urlOrcamento}/orcamento/add-with-produtos`, payload, {headers});
    }
}
