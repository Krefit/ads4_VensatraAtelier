// orcamento-model.ts

import {Cliente} from './cliente';
import {ProdutoModel} from './produto-model';

export interface OrcamentoModel {
    id?: number;
    cliente?: Cliente;
    dataEntrega?: Date;
    produtos?: ProdutoModel[];
    desconto?: number;
    total?: number;
}
