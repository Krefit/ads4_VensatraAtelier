export interface OrcamentoDTO {
    orcamento: {
        id?: number;
        cliente: {
            id: number;
            nome: string;
            cpf: string;
            endereco: string;
            email: string;
            telefone: string;
        };
        dataEntrega: string;
        quantidade: number;
        desconto: number;
        descricao: string;
        orcamentoProdutos: {
            produto: {
                id: number;
                nome: string;
                descricao: string;
                nomeFoto: string;
                quantidade: number;
            };
            quantidade: number;
        }[];
    };
}
