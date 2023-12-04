import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProdutoModel} from '../model/produto-model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutoServiceService {

    private readonly urlProduto = 'http://localhost:8080/api/produtos';

    constructor(private http: HttpClient) {
    }

    listarProduto(): Observable<HttpResponse<ProdutoModel[]>> {
        const headers = { 'Authorization': 'Bearer ' + this.getToken() };
        return this.http.get<ProdutoModel[]>(this.urlProduto, { observe: 'response', headers });
    }

    private getToken(): string {
        // Obtenha o token de onde quer que esteja armazenado (localStorage, sessionStorage, etc.)
        return localStorage.getItem('token') || '';
    }

}
