import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-button',
  imports: [ButtonModule, ButtonGroupModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {}
