import {Component, OnInit} from '@angular/core';
import {MyCartService} from '../services/my-cart.service';
import {CheckoutService} from '../services/checkout.service';
import {ProdutoModel} from '../model/produto-model';
import {ClienteService} from '../services/cliente.service';
import {Cliente} from '../model/cliente';
import {OrcamentoService} from '../services/orcamento.service';
import {NavController} from '@ionic/angular';

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
        console.log(this.cartItems);
        const orcamentoData = {
            orcamento: {
                cliente_id: this.cliente?.id || 0,
                dataInicioProd: '2023-12-01T03:00:00.000Z',  // Substitua pela data desejada
                quantidade: 1,  // Substitua pela quantidade desejada
                desconto: 5,  // Substitua pelo desconto desejado
                descricao: 'Descrição do Orcamento',  // Substitua pela descrição desejada
            },
            listaProdutos: this.cartItems.map(item => ({
                produtoId: item.produto.id,
                descricao: item.produto.descricao,
                quantidadeProduto: item.quantidade
            }))
        };
        // Envie o JSON ao serviço OrcamentoService
        // tslint:disable-next-line:max-line-length
        this.orcamentoService.salvarOrcamento(orcamentoData.orcamento, orcamentoData.listaProdutos, orcamentoData.orcamento.cliente_id).subscribe(
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
        this.cartService.clearCart();
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
        return 5;
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
        this.cartService.clearCart();
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
