import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextColorService {
  // Menyimpan warna teks yang sedang dipilih
  private textColorSubject = new BehaviorSubject<string>('#000'); // Default black
  textColor$ = this.textColorSubject.asObservable();

  // Fungsi untuk mengubah warna teks
  setTextColor(color: string): void {
    this.textColorSubject.next(color);
  }
}
