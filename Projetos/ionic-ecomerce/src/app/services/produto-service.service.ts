import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProdutoModel} from '../model/produto-model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutoServiceService {

    private readonly urlProduto = 'http://localhost:8080/api/produto';

    constructor(private http: HttpClient) {
    }
    listarProduto(): Observable<HttpResponse<ProdutoModel[]>> {
        return this.http.get<ProdutoModel[]>(this.urlProduto, { observe: 'response'});
    }
}
