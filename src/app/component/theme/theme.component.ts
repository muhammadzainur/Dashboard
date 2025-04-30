import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TextColorService } from '../../color/text-color.service';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [FormsModule, CommonModule, DrawerModule, SelectButtonModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
})
export class ThemeComponent {
  visible: boolean = false;
  textColor: string = '#000';

  selectedMode: string = 'light-mode';

  modeOptions = [
    { label: 'Light', value: 'light-mode' },
    { label: 'Dark', value: 'dark-mode' },
  ];

  textcolors: string[] = [
    '#ffffff',
    '#22c55e',
    '#10b981',
    '#84cc16',
    '#f97316',
    '#facc15',
    '#14b8a6',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private textColorService: TextColorService
  ) {
    this.textColorService.textColor$.subscribe((color) => {
      this.textColor = color; // Menyimpan warna yang dipilih
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyModeClass(this.selectedMode);
    }
  }

  toggleDrawer() {
    this.visible = !this.visible;
  }

  onCloseDrawer() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyTextColor();
    }
  }

  toggleDarkMode() {
    this.applyModeClass(this.selectedMode);
  }

  applyModeClass(mode: string) {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      root.classList.remove('dark-mode', 'light-mode');
      root.classList.add(mode);
      console.log('Switched to mode:', mode);
    }
  }

  applyTextColor() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.setProperty('--text-color', this.textColor);
    }
  }

  updateTextColor(color: string) {
    this.textColor = color;
    this.textColorService.setTextColor(color); // Tambahkan ini untuk mengupdate service
    console.log('Updating text color to:', color);

    // Opsional: Jika ingin langsung menerapkan CSS variable
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.setProperty('--text-color', color);
    }
  }
}
