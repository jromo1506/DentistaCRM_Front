import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
   registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const userData = this.registerForm.value;

    this.userService.addUser(userData).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito', response);
        // Redirigir o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al registrar el usuario', error);
        // Manejar errores de la API
      },
    });
  }
}
