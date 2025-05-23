import { Component, OnInit } from '@angular/core';
import { Product } from '../../../variabel/product';
import { ComponentService } from '../../../service/component.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../service/cart/cart.service';

@Component({
  selector: 'app-detail-product',
  imports: [TagModule, ButtonModule, FormsModule, RatingModule, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss',
})
export class DetailProductComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private componentService: ComponentService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.componentService.getProductsData().forEach((product) => {
      if (product.id === productId) {
        this.product = product;
      }
    });
  }

  loadProductDetails(productId: string) {
    this.componentService.getProducts().then((products) => {
      this.product = products.find((p) => p.id === productId);
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return null;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
    this.router.navigate(['/']);
  }
}
