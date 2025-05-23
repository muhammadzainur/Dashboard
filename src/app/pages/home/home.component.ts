import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ComponentService } from '../../service/component.service';
import { Product } from '../../variabel/product';
import { TextColorService } from '../../color/text-color.service';
import { Router } from '@angular/router';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-home',
  imports: [ChartModule, CardModule, CommonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  textColor: string = '#000';

  cardItems = [
    {
      title: 'Sales',
      value: '130',
      description: 'Total Sales',
      change: '+15%',
      icon: 'pi-shopping-cart',
      iconBg: 'bg-green-500',
      changeColor: 'text-green-500',
      trendIcon: 'pi-arrow-up',
    },
    {
      title: 'Revenue',
      value: '$1000',
      description: 'Total Revenue',
      change: '+5%',
      icon: 'pi-dollar',
      iconBg: 'bg-blue-500',
      changeColor: 'text-red-500',
      trendIcon: 'pi-arrow-down',
    },
    {
      title: 'Customers',
      value: '10752',
      description: 'Total Customers',
      change: '+12%',
      icon: 'pi-users',
      iconBg: 'bg-slate-500',
      changeColor: 'text-green-500',
      trendIcon: 'pi-arrow-up',
    },
    {
      title: 'Stock',
      value: '16348',
      description: 'Total Stock',
      change: '+20%',
      icon: 'pi-chart-line',
      iconBg: 'bg-orange-500',
      changeColor: 'text-green-500',
      trendIcon: 'pi-arrow-up',
    },
  ];

  revenueData: any;
  revenueOptions: any;

  stockData: any;
  stockOptions: any;

  platformId = inject(PLATFORM_ID);
  componentService = inject(ComponentService);

  products!: Product[];

  constructor(
    private cd: ChangeDetectorRef,
    private textColorService: TextColorService
  ) {}

  themeEffect = effect(() => {
    if (this.componentService.transitionComplete()) {
      if (this.componentService.preset()) {
        this.initCharts();
      }
    }
  });

  ngOnInit(): void {
    this.initCharts();
    this.componentService.getProducts().then((data) => {
      this.products = data;
    });
    this.textColorService.textColor$.subscribe((color) => {
      this.textColor = color;
      this.cd.markForCheck();
    });
  }

  initCharts() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            type: 'bar',
            label: 'Online Revenue',
            backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
            data: [12000, 15000, 14000, 18000, 20000, 22000, 21000],
          },
          {
            type: 'bar',
            label: 'Offline Revenue',
            backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
            data: [8000, 7000, 6000, 10000, 9000, 11000, 9500],
          },
        ],
      };

      this.revenueOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            stacked: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };

      this.stockData = {
        labels: ['Electronic', 'Eyeglass', 'Shoe'],
        datasets: [
          {
            data: [4000, 5000, 3500],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-green-500'),
              documentStyle.getPropertyValue('--p-blue-500'),
              documentStyle.getPropertyValue('--p-yellow-500'),
            ],
            borderColor: surfaceBorder,
            borderWidth: 1,
          },
        ],
      };

      this.stockOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              color: textColor,
              padding: 30,
            },
          },
        },
      };

      this.cd.markForCheck();
    }
  }
}
