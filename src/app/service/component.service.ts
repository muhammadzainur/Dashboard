import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  // Metode untuk mendapatkan data produk (non-Promise)
  getProductsData() {
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
        inventoryStatus: 'OUTOFSTOCK',
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
    ];
  }

  // Metode untuk mendapatkan data produk dengan orders (non-Promise)
  getProductsWithOrdersData() {
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
        orders: [
          {
            id: '1001-0',
            productCode: 'nvklal433',
            date: '2020-05-14',
            amount: 72,
            quantity: 1,
            customer: 'Maisha Jefferson',
            status: 'DELIVERED',
          },
        ],
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
        orders: [
          {
            id: '1002-0',
            productCode: 'zz21cz3c1',
            date: '2020-07-05',
            amount: 79,
            quantity: 1,
            customer: 'Stacey Leja',
            status: 'DELIVERED',
          },
          {
            id: '1002-1',
            productCode: 'zz21cz3c1',
            date: '2020-02-06',
            amount: 79,
            quantity: 1,
            customer: 'Ashley Wickens',
            status: 'DELIVERED',
          },
        ],
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
        orders: [],
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
        orders: [
          {
            id: '1004-0',
            productCode: 'h456wer53',
            date: '2020-09-05',
            amount: 60,
            quantity: 4,
            customer: 'Mayumi Misaki',
            status: 'PENDING',
          },
          {
            id: '1004-1',
            productCode: 'h456wer53',
            date: '2019-04-16',
            amount: 2,
            quantity: 30,
            customer: 'Francesco Salvatore',
            status: 'DELIVERED',
          },
        ],
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accessories',
        quantity: 0,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4,
        orders: [
          {
            id: '1005-0',
            productCode: 'av2231fwg',
            date: '2020-01-25',
            amount: 120,
            quantity: 1,
            customer: 'Isabel Sinclair',
            status: 'RETURNED',
          },
          {
            id: '1005-1',
            productCode: 'av2231fwg',
            date: '2019-03-12',
            amount: 240,
            quantity: 2,
            customer: 'Lionel Clifford',
            status: 'DELIVERED',
          },
          {
            id: '1005-2',
            productCode: 'av2231fwg',
            date: '2019-05-05',
            amount: 120,
            quantity: 1,
            customer: 'Cody Chavez',
            status: 'DELIVERED',
          },
        ],
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accessories',
        quantity: 5,
        inventoryStatus: 'LOWSTOCK',
        rating: 3,
        orders: [
          {
            id: '1006-0',
            productCode: 'bib36pfvm',
            date: '2020-02-24',
            amount: 32,
            quantity: 1,
            customer: 'Arvin Darci',
            status: 'DELIVERED',
          },
          {
            id: '1006-1',
            productCode: 'bib36pfvm',
            date: '2020-01-14',
            amount: 64,
            quantity: 2,
            customer: 'Izzy Jones',
            status: 'PENDING',
          },
        ],
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Galaxy Earrings',
        description: 'Product Description',
        image: 'galaxy-earrings.jpg',
        price: 34,
        category: 'Accessories',
        quantity: 23,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        orders: [
          {
            id: '1007-0',
            productCode: 'mbvjkgip5',
            date: '2020-06-19',
            amount: 34,
            quantity: 1,
            customer: 'Jennifer Smith',
            status: 'DELIVERED',
          },
        ],
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Game Controller',
        description: 'Product Description',
        image: 'game-controller.jpg',
        price: 99,
        category: 'Electronics',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 4,
        orders: [
          {
            id: '1008-0',
            productCode: 'vbb124btr',
            date: '2020-01-05',
            amount: 99,
            quantity: 1,
            customer: 'Jeanfrancois David',
            status: 'DELIVERED',
          },
          {
            id: '1008-1',
            productCode: 'vbb124btr',
            date: '2020-01-19',
            amount: 198,
            quantity: 2,
            customer: 'Ivar Greenwood',
            status: 'RETURNED',
          },
        ],
      },
    ];
  }

  constructor() {}

  // Metode Promise untuk mendapatkan subset data produk
  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 3));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
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
