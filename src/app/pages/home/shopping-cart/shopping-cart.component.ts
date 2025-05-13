import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateTotalPrice();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalPrice();
    }
  }

  removeItem(item: any) {
    this.cartService.removeItem(item.id);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
