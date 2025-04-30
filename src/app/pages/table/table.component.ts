import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../variabel/product';
import { ComponentService } from '../../service/component.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [TableModule, CommonModule, BadgeModule],
  providers: [ComponentService],
})
export class TableComponent implements OnInit {
  // Mengubah nama kelas dari TableStyleDemo menjadi TableComponent
  products: Product[] = [];

  constructor(
    private componentService: ComponentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDemoData();
  }

  // Memuat data produk dengan orders dari service
  loadDemoData() {
    this.componentService
      .getProductsWithOrders()
      .then((data: Product[]) => {
        if (data && data.length > 0) {
          this.products = data;
          this.cd.markForCheck();
        } else {
          console.error('Data produk tidak ditemukan!');
        }
      })
      .catch((error) => {
        console.error('Terjadi kesalahan saat memuat data:', error);
      });
  }

  // Fungsi untuk menentukan kelas CSS baris
  rowClass(product: Product) {
    return {
      '!bg-primary !text-primary-contrast': product.category === 'Fitness',
    };
  }

  // Fungsi untuk menentukan gaya baris
  rowStyle(product: Product) {
    if (product.quantity !== undefined && product.quantity === 0) {
      return { fontWeight: 'bold', fontStyle: 'italic' };
    }
    return {};
  }

  // Fungsi untuk menentukan severity berdasarkan jumlah produk
  stockSeverity(product: Product) {
    if (product.quantity === undefined) return 'info';
    if (product.quantity === 0) return 'danger';
    else if (product.quantity > 0 && product.quantity < 10) return 'warn';
    else return 'success';
  }
}
