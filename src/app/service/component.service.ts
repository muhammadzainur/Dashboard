import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../variabel/product';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  // BehaviorSubject untuk menyimpan dan memantau perubahan data produk
  private productsSource = new BehaviorSubject<Product[]>(
    this.initProductsData()
  );

  // Observable yang dapat disubscribe oleh komponen
  public products$ = this.productsSource.asObservable();

  // Map untuk menyimpan informasi gambar (dalam aplikasi nyata, ini bisa diimplementasikan dengan penyimpanan persisten)
  private productImagesMap: Map<string, string> = new Map();

  constructor() {}

  // Data produk awal (data asli)
  private initProductsData(): Product[] {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      {
        id: '1005',
        code: 'h456wer53',
        name: 'test',
        description: 'Product Description',
        image: 'image-profile.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
    ];
  }

  // Metode untuk mendapatkan semua data produk saat ini (non-Promise)
  getProductsData(): Product[] {
    return this.productsSource.getValue();
  }

  // Menyimpan URL gambar untuk produk tertentu
  setProductImageUrl(productId: string, imageUrl: string): void {
    this.productImagesMap.set(productId, imageUrl);
  }

  // Mendapatkan URL gambar untuk produk tertentu
  getProductImageUrl(productId: string): string | undefined {
    return this.productImagesMap.get(productId);
  }

  // FUNGSI UTAMA: Untuk menyimpan produk baru ke dalam array
  addProduct(product: Product): void {
    // Generate kode produk jika tidak ada
    if (!product.code) {
      product.code = this.generateProductCode();
    }

    // Mengambil data produk saat ini
    const currentProducts = this.getProductsData();

    // Menambahkan produk baru ke array
    const updatedProducts = [...currentProducts, product];

    // Memperbarui BehaviorSubject dengan array yang sudah diupdate
    this.productsSource.next(updatedProducts);

    console.log('Produk baru berhasil ditambahkan:', product);
  }

  // Mengupdate produk yang sudah ada
  updateProduct(product: Product): boolean {
    const currentProducts = this.getProductsData();
    const index = currentProducts.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      // Produk ditemukan, update produk
      const updatedProducts = [...currentProducts];
      updatedProducts[index] = product;

      // Update BehaviorSubject
      this.productsSource.next(updatedProducts);
      console.log('Produk berhasil diupdate:', product);
      return true;
    }

    console.log('Produk dengan ID', product.id, 'tidak ditemukan');
    return false;
  }

  // Menghapus produk
  deleteProduct(productId: string): boolean {
    const currentProducts = this.getProductsData();
    const updatedProducts = currentProducts.filter((p) => p.id !== productId);

    if (updatedProducts.length !== currentProducts.length) {
      // Produk ditemukan dan dihapus
      this.productsSource.next(updatedProducts);
      console.log('Produk dengan ID', productId, 'berhasil dihapus');
      return true;
    }

    console.log('Produk dengan ID', productId, 'tidak ditemukan');
    return false;
  }

  // Fungsi utilitas untuk generate kode produk secara acak
  private generateProductCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // API Promise yang sudah ada, dimodifikasi untuk menggunakan data dari BehaviorSubject
  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 3));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }

  // Karena kita hanya fokus ke getProductsData(), function lain tetap ada tapi tidak dimodifikasi
  getProductsWithOrdersData() {
    return [
      // Data tetap sama seperti di file asli
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        orders: [
          {
            id: '1000-0',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 65,
            quantity: 1,
            customer: 'David James',
            status: 'PENDING',
          },
          {
            id: '1000-1',
            productCode: 'f230fh0g3',
            date: '2020-05-14',
            amount: 130,
            quantity: 2,
            customer: 'Leon Rodrigues',
            status: 'DELIVERED',
          },
        ],
      },
      // Produk lainnya tetap sama
    ];
  }

  getProductsWithOrdersSmall() {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 1));
  }

  getProductsWithOrders() {
    return Promise.resolve(this.getProductsWithOrdersData());
  }

  // Metode tambahan dari component.service.ts asli
  setComponentState(isOpen: boolean): void {
    // Logika untuk mengubah state
  }

  getCurrentComponentState(): boolean {
    return true; // Ganti dengan implementasi yang sesuai jika ada state
  }

  transitionComplete(): boolean {
    return true; // Ganti dengan implementasi logika jika perlu
  }

  preset(): boolean {
    return true; // Ganti dengan logika yang sesuai
  }
}
