import { Component, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../../variabel/product';
import { ComponentService } from '../../../service/component.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Status {
  name: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    RatingModule,
    TagModule,
    FormsModule,
    DropdownModule,
    SelectModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  // Deklarasi variabel untuk produk dan tabel
  products: Product[] = [];
  first = 0;
  rows = 10;
  visible = false;
  textColor: string = '#000';

  // Variabel untuk form produk baru
  newProduct: Product = this.initNewProduct();
  selectedStatus?: Status;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  // Menyimpan informasi gambar yang diunggah
  uploadedImages: Map<string, { file: File; url: string }> = new Map();

  // Variabel untuk subscription
  private productSubscription: Subscription | null = null;

  cities: Status[] = [
    { name: 'INSTOCK' },
    { name: 'OUTOFSTOCK' },
    { name: 'LOWSTOCK' },
  ];

  constructor(
    private componentService: ComponentService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Subscribe ke observable products$ dari service
    this.productSubscription = this.componentService.products$.subscribe(
      (products) => {
        this.products = products;
        this.cd.detectChanges();
      }
    );

    // Tetap menggunakan ini untuk memastikan data awal dimuat
    this.componentService.getProducts().then((data) => {
      // Data sudah dimuat melalui subscription di atas
    });
  }

  ngOnDestroy(): void {
    // Membersihkan subscription untuk mencegah memory leak
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    // Membersihkan URL objek yang telah dibuat
    this.uploadedImages.forEach((image) => {
      if (image.url.startsWith('blob:')) {
        URL.revokeObjectURL(image.url);
      }
    });
  }

  // Method untuk inisialisasi produk baru
  initNewProduct(): Product {
    return {
      id: '0',
      code: '',
      name: '',
      description: 'Product Description',
      image: '',
      price: 0,
      category: 'Electronics',
      rating: 0,
      inventoryStatus: 'INSTOCK',
      quantity: 0,
    };
  }

  // Method untuk menampilkan produk sesuai dengan paginasi
  pagedProducts() {
    return this.products.slice(this.first, this.first + this.rows);
  }

  // Method untuk menangani perubahan halaman
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  // Method untuk menampilkan dialog
  showDialog() {
    this.newProduct = this.initNewProduct();
    this.selectedStatus = { name: 'INSTOCK' };
    this.selectedFile = null;
    this.imagePreview = null;
    this.visible = true;
  }

  // Method untuk mendapatkan severity berdasarkan status
  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  }

  // Method untuk melihat detail produk
  viewProductDetails(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  // Method untuk menangani pemilihan file
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Menggunakan FileReader untuk membuat preview gambar
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;

        // Nama gambar unik menggunakan timestamp
        const uniqueImageName = `user_${Date.now()}_${this.selectedFile!.name}`;
        this.newProduct.image = uniqueImageName;

        // Menyimpan informasi gambar yang diunggah
        this.uploadedImages.set(uniqueImageName, {
          file: this.selectedFile!,
          url: this.imagePreview!,
        });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Memeriksa apakah gambar adalah hasil unggahan user
  isUserUploadedImage(imageName: string): boolean {
    return imageName.startsWith('user_') || this.uploadedImages.has(imageName);
  }

  // Mendapatkan URL untuk gambar yang diunggah user
  getUserUploadImageUrl(imageName: string): string {
    const imageInfo = this.uploadedImages.get(imageName);
    if (imageInfo) {
      return imageInfo.url;
    }

    // Jika gambar tidak ditemukan di Map, mungkin ini adalah gambar yang baru saja ditambahkan
    // di sesi sebelumnya dan belum ada di Map. Gunakan gambar placeholder sebagai gantinya.
    return 'assets/placeholder-image.png';
  }

  // Method untuk menyimpan produk baru
  saveProduct() {
    if (!this.newProduct.name || this.newProduct.price <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Silahkan lengkapi data produk!',
      });
      return;
    }

    // Menetapkan status dari dropdown
    if (this.selectedStatus) {
      this.newProduct.inventoryStatus = this.selectedStatus.name;
    }

    // Generate ID baru (dalam kasus nyata bisa dari backend)
    const newId = (
      Math.max(...this.products.map((p) => Number(p.id)), 0) + 1
    ).toString();
    this.newProduct.id = newId;

    // Jika tidak ada gambar yang dipilih, gunakan gambar default
    if (!this.newProduct.image) {
      this.newProduct.image = 'default.jpg';
    }

    // Menyimpan produk baru menggunakan service
    this.componentService.addProduct({ ...this.newProduct });

    // Tampilkan pesan sukses
    this.messageService.add({
      severity: 'success',
      summary: 'Sukses',
      detail: 'Produk baru berhasil ditambahkan!',
    });

    // Tutup dialog
    this.visible = false;

    // Reset form untuk produk baru
    this.newProduct = this.initNewProduct();
    this.selectedStatus = undefined;
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
