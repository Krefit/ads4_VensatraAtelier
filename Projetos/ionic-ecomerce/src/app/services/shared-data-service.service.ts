import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProdutoModel} from '../model/produto-model';

@Injectable({
    providedIn: 'root'
})
export class SharedDataServiceService {

    private clienteData = new BehaviorSubject<{ nome: string; endereco: string } | null>(null);
    clienteData$ = this.clienteData.asObservable();
    private produtoData = new BehaviorSubject<ProdutoModel | null>(null);
    produtoData$ = this.produtoData.asObservable();

    setProdutoData(data: ProdutoModel) {
        this.produtoData.next(data);
    }
    setClienteData(data: { nome: string; endereco: string }) {
        this.clienteData.next(data);
    }
}
