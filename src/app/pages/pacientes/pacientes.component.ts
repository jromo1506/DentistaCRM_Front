import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/components/forms/form/form.component';
import { ListaPacientesComponent } from 'src/app/components/pacientes/lista-pacientes/lista-pacientes.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule,FormComponent,ListaPacientesComponent],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent {

}
