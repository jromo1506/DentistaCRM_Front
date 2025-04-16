import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal.service'; // Importa SwalService

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private swalService: SwalService
  ) {

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apeM: ['', [Validators.required]],
      apeP: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.swalService.errorCampos('Por favor, complete todos los campos');
      return;
    }
    this.nuevoUsuario();
  }

  nuevoUsuario(): void {
    const userData = this.registerForm.value; // Captura los datos del formulario
    console.log('Datos enviados:', userData);

    // Guarda los datos en localStorage
    const usuariosGuardados = localStorage.getItem('usuarios'); // Verifica si ya hay usuarios guardados
    const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    usuarios.push(userData); // Agrega el nuevo usuario a la lista
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Actualiza el localStorage

    // Enviar al servidor
    this.userService.addUser(userData).subscribe({
      next: (response) => {
        this.swalService.success('Usuario registrado con éxito');
        this.registerForm.reset();
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          this.swalService.error('El usuario ya existe', 'Registro fallido');
        } else {
          this.swalService.error('Error al registrar el usuario', 'Registro fallido');
        }
      },
    });
  }


}
