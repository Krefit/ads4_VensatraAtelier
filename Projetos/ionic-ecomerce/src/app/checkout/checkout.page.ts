import {Component, OnInit} from '@angular/core';
import {MyCartService} from '../services/my-cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckoutService} from '../services/checkout.service';
import {ProdutoModel} from '../model/produto-model';
import {ClienteService} from '../services/cliente.service';
import {Cliente} from '../model/cliente';
import {CheckoutPageModule} from './checkout.module';
import {OrcamentoService} from '../services/orcamento.service';
import {NavController} from '@ionic/angular';
import {OrcamentoDTO} from '../model/orcamento-dto';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

    cliente: Cliente | null = null;
    checkoutItems: any[];
    cartItems: { produto: ProdutoModel; quantidade: number }[] = [];

    constructor(
        private checkoutService: CheckoutService,
        private clienteService: ClienteService,
        private cartService: MyCartService,
        private navCtrl: NavController,
        private orcamentoService: OrcamentoService
    ) {}
    finalizeOrcamento() {
        // Construa o objeto JSON com base nas informações do cliente e do carrinho
        const orcamentoData: OrcamentoDTO = {
            orcamento: {
                cliente: {
                    id: this.cliente?.id || 0,  // Use o valor real ou um valor padrão, se não existir
                    nome: this.cliente?.nome || '',
                    cpf: this.cliente?.cpf || '',
                    endereco: this.cliente?.endereco || '',
                    email: this.cliente?.email || '',
                    telefone: this.cliente?.telefone || ''
                },
                dataEntrega: '2023-12-31T23:59:59',  // Substitua pela data desejada
                quantidade: 1,  // Substitua pela quantidade desejada
                desconto: 0.05,  // Substitua pelo desconto desejado
                descricao: 'Descrição do Orcamento',  // Substitua pela descrição desejada
                orcamentoProdutos: this.cartItems.map(item => ({
                    produto: {
                        id: item.produto.id,
                        nome: item.produto.nome,
                        descricao: item.produto.descricao,
                        nomeFoto: item.produto.nomeFoto,
                        quantidade: item.quantidade
                    },
                    quantidade: 1
                }))
            }
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        // Envie o JSON ao serviço OrcamentoService
        this.orcamentoService.salvarOrcamento(orcamentoData).subscribe(
            response => {
                console.log('Orcamento processado com sucesso:', response);
                // Adicione a navegação ou outras ações necessárias após o orcamento
                this.navCtrl.navigateForward('/confirm');
            },
            error => {
                console.error('Erro durante o processo de orcamento:', error);
                // Adicione tratamento de erro apropriado
            }
        );
    }


    ngOnInit() {
        this.recendoDadosCart();

        const clienteId = 1;
        this.clienteService.buscarClientePorId(clienteId).subscribe(
            cliente => {
                this.cliente = cliente;
            },
            error => {
                console.error('Erro ao obter dados do cliente:', error);
            }
        );
    }

    recendoDadosCart() {
        this.cartItems = this.checkoutService.getCartItemsCopy();
    }

    getTotalSubtotal(): number {
        // Calcula o subtotal total de todos os itens
        return this.cartItems.reduce((total, item) => total + (item.quantidade * item.produto.preco), 0);
    }

    getDiscount(): number {
        // Aqui você pode implementar a lógica para obter o valor do desconto
        // Por exemplo, se o desconto for 5%, retorne 0.05
        return 0.05;
    }

    getTotal(): number {
        const subtotal = this.getTotalSubtotal();
        const discount = this.getDiscount();
        // Calcula o total após aplicar o desconto
        return subtotal - (subtotal * discount);
    }

    increaseQuantity(item: { produto: ProdutoModel; quantidade: number }) {
        this.cartService.addToCart(item.produto, item.quantidade + 1);
        this.cartItems = this.cartService.getCartItems();
    }
    decreaseQuantity(item: { produto: ProdutoModel; quantidade: number }) {
        if (item.quantidade > 1) {
            this.cartService.updateCart(item.produto, item.quantidade - 1);
            this.cartItems = this.cartService.getCartItems();
        } else {
            this.cartService.removeFromCart(item);
            this.cartItems = this.cartService.getCartItems();
        }
    }
    clearCart() {
        this.checkoutService.clearCartItems();
        this.checkoutItems = [];
    }

    // getDiscountedSubtotal(item: { produto: any; quantidade: number }): number {
    //     // Implemente a lógica para calcular o subtotal com desconto de um item
    //     const subtotal = this.getSubtotal(item);
    //     const desconto = 0.05; // Substitua pela sua lógica de desconto
    //     return subtotal - subtotal * desconto;
    // }
    // getTotal(): number {
    //     // Implemente a lógica para calcular o total dos itens no carrinho
    //     return this.cartService.getTotalPrice();
    // }
}
