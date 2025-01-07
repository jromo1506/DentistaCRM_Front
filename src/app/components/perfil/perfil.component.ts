import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  tipo!: string;
  data: any;
  pacientes: Array<any> = []; 
  doctores: Array<any> = []; 
  usuarios: Array<any> = []; 

  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('name') || '';
    const id = this.route.snapshot.paramMap.get('id');
    
    console.log("datos obtenidos: ",this.tipo, id)
    // Cargamos los pacientes (por ejemplo, desde localStorage o servicio)
    if (this.tipo === 'paciente') {
      const pacientesGuardados = localStorage.getItem('pacientes');
      if (pacientesGuardados) {
        this.pacientes = JSON.parse(pacientesGuardados);
      }
      this.data = this.pacientes.find(p => p.nombre === id);
    } else if (this.tipo === 'doctor') {
      const doctoresGuardados = localStorage.getItem('dotores');
      if (doctoresGuardados) {
        this.doctores = JSON.parse(doctoresGuardados);
      }

      this.data = this.doctores.find(d => d.nombre === id);
    } else if (this.tipo === 'usuario') {
      const usuariosGuardados = localStorage.getItem('usuario');
      if (usuariosGuardados) {
        this.usuarios = JSON.parse(usuariosGuardados);
      }
      this.data = this.usuarios.find(u => u.nombre === id);
    }
  
  }
}
