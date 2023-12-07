export class ProdutoModel {
    id?: number;
    nome?: string;
    descricao?: string;
    preco?: number;
    nomeFoto?: string;
    // quantidade?: number;

    push(param: { produto: { preco: number; nome: string; id: number, descricao: string, nomeFoto: string} }) {
    }
}
