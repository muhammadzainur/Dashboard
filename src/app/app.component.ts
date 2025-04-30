import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ProfileComponent } from './pages/profile/profile.component';
import { ThemeComponent } from './component/theme/theme.component';
import { RouterModule } from '@angular/router';
import { TextColorService } from './color/text-color.service';

interface MenuItem {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MenuModule,
    ProfileComponent,
    ThemeComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  sidebarVisible: boolean = false;
  textColor: string = '#000';

  componentItems: MenuItem[] = [
    { label: 'Charts', icon: 'pi pi-chart-line', link: '/charts' },
    { label: 'Forms', icon: 'pi pi-file', link: '/forms' },
    { label: 'Tables', icon: 'pi pi-table', link: '/tables' },
    { label: 'Buttons', icon: 'pi pi-check-square', link: '/buttons' },
  ];

  appItems: MenuItem[] = [
    { label: 'Chat', icon: 'pi pi-comments', link: '/chat' },
    { label: 'Tree', icon: 'pi pi-share-alt', link: '/tree' },
    { label: 'Overlay', icon: 'pi pi-clone', link: '/overlay' },
  ];

  // pageItems: MenuItem[] = [
  //   { label: 'Login', icon: 'pi pi-sign-in', link: '/auth/login' },
  //   { label: 'Register', icon: 'pi pi-user-plus', link: '/register' },
  //   { label: 'Forgot Password', icon: 'pi pi-lock', link: '/forgot-password' },
  // ];

  menuItems: any[] = [];

  constructor(private textColorService: TextColorService) {}

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Dashboard',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Components',
        items: this.componentItems.map((item) => ({
          label: item.label,
          icon: item.icon,
          routerLink: item.link,
        })),
      },
      {
        label: 'App',
        items: this.appItems.map((item) => ({
          label: item.label,
          icon: item.icon,
          routerLink: item.link,
        })),
      },

      // {
      //   label: `Login`,
      //   items: [
      //     {
      //       label: 'Login',
      //       icon: 'pi pi-sign-in',
      //       routerLink: ['/auth/login'],
      //     },
      //     {
      //       label: 'Register',
      //       icon: 'pi pi-user-plus',
      //       routerLink: ['/register'],
      //     },
      //     {
      //       label: 'Forgot Password',
      //       icon: 'pi pi-lock',
      //       routerLink: ['/forgot-password'],
      //     },
      //   ],
      // },
    ];

    this.textColorService.textColor$.subscribe((color) => {
      this.textColor = color;
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  changeTextColor(color: string): void {
    this.textColorService.setTextColor(color);
  }
}
