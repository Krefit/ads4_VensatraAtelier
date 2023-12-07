import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrcamentoModel} from '../model/orcamento-model';
import {OrcamentoDTO} from '../model/orcamento-dto';

@Injectable({
    providedIn: 'root'
})
export class OrcamentoService {

    private readonly urlOrcamento = 'http://localhost:8080/api/orcamento';

    constructor(
        private http: HttpClient
    ) {
    }

    obterDetalhesOrcamento(id: number): Observable<HttpResponse<OrcamentoModel[]>> {
        return this.http.get<OrcamentoModel[]>(`${this.urlOrcamento}/${id}/orcamento`, {observe: 'response'});
    }

    salvarOrcamento(orcamentoData: OrcamentoDTO, headers?: HttpHeaders): Observable<any> {
        const url = `${this.urlOrcamento}/create`;
        return this.http.post(url, orcamentoData, { headers });
    }

}
