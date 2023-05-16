import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProdutoService{
    constructor(private _http: HttpClient){}

    addProduto(data: any): Observable<any> {
        return this._http.post('http://localhost:8080/produto', data);
    }

    updateProduto(id: number, data: any): Observable<any>{
        return this._http.put(`http://localhost:8080/produto`, data);
    }

    getProdutoLista(): Observable<any>{
        return this._http.get('http://localhost:8080/produto');
    }

    deleteProduto(id: number): Observable<any>{
        return this._http.delete(`http://localhost:8080/produto/${id}`);
    }
}


