import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyCartService} from '../services/my-cart.service';

@Component({
    selector: 'app-cart-icon',
    templateUrl: './cart-icon.page.html',
    styleUrls: ['./cart-icon.page.scss'],
})
export class CartIconPage implements OnInit {
    totalItems: number;
    constructor(
        private router: Router,
        private cartService: MyCartService
    ) {
    }

    ngOnInit() {
        this.cartService.totalItems$.subscribe(totalItems => {
            this.totalItems = totalItems;
        });
    }

    irParaCarrinho() {
        this.router.navigate(['/my-cart']);
    }
}
