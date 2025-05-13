import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private totalQuantitySubject = new BehaviorSubject<number>(0);
  totalQuantity$ = this.totalQuantitySubject.asObservable(); // expose observable

  addToCart(product: any, quantity: number) {
    const existing = this.cartItems.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ ...product, quantity });
    }
    this.updateTotalQuantity();
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.updateTotalQuantity();
  }

  private updateTotalQuantity() {
    const total = this.getTotalQuantity();
    this.totalQuantitySubject.next(total);
  }

  getTotalQuantityObservable() {
    return this.totalQuantity$;
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateTotalQuantity(); // penting: update jumlah setelah hapus
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
