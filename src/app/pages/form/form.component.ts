import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-form',
  imports: [
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    TextareaModule,
    SelectModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  username: string | undefined;
  email: string | undefined;
  age: string | undefined;

  cities: City[] | undefined;

  selectedCity: City | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'California', code: 'CA' },
      { name: 'China', code: 'CN' },
      { name: 'Florida', code: 'FL' },
      { name: 'New York', code: 'NY' },
      { name: 'Jepang', code: 'JP' },
    ];
  }
}
