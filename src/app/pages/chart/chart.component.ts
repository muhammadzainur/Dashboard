import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ComponentService } from '../../service/component.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-chart',
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  data: any;
  options: any;

  dataDoughnut: any;
  optionsDoughnut: any;

  dataHorizontalBar: any;
  optionsHorizontalBar: any;

  dataCombo: any;
  optionsCombo: any;

  platformId = inject(PLATFORM_ID);
  configService = inject(ComponentService);

  constructor(private cd: ChangeDetectorRef) {}

  themeEffect = effect(() => {
    if (this.configService.transitionComplete()) {
      if (this.configService.preset()) {
        this.initChart();
      }
    }
  });

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.data = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            tension: 0.4,
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            tension: 0.4,
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
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

      this.dataDoughnut = {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-gray-500'),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-cyan-400'),
              documentStyle.getPropertyValue('--p-orange-400'),
              documentStyle.getPropertyValue('--p-gray-400'),
            ],
          },
        ],
      };

      this.optionsDoughnut = {
        cutout: '60%',
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: textColor,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },
      };

      this.dataHorizontalBar = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'My Second dataset',
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: [28, 48, 40, 19, 86, 27, 90],
          },
        ],
      };

      this.optionsHorizontalBar = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
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

      this.dataCombo = {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            type: 'line',
            label: 'Dataset 1',
            borderColor: documentStyle.getPropertyValue('--p-orange-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: [50, 25, 12, 48, 56, 76, 42],
          },
          {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: 'white',
            borderWidth: 2,
          },
          {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
            data: [41, 52, 24, 74, 23, 21, 32],
          },
        ],
      };

      this.optionsCombo = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      this.cd.markForCheck();
    }
  }
}
