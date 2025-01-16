import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  usuarios: Array<any> = [];

  isModalVisible: boolean = false; // Controla la visibilidad del modal
  esEdicion: boolean = false;
  usuarioEdicion: number | null = null;

  // Modelo para un nuevo usuario
  nuevoUsuario = {
    user: '',
    password: '',
    nombre: '',
    paterno: '',
    materno: '',
    telefono: '',
    correo: '',
    tipo: '',
    especialidad: ''
  };

  constructor(private swalService: SwalService) {} // Inyecta el servicio

  abrirModal() {
    this.isModalVisible = true; // Muestra el modal
  }

  cerrarModal() {
    this.isModalVisible = false; // Oculta el modal
    this.limpiarFormulario();
  }

  agregarUsuario() {
    if (this.nuevoUsuario.user && this.nuevoUsuario.nombre && this.nuevoUsuario.password && this.nuevoUsuario.paterno) {
      if(this.esEdicion && this.usuarioEdicion !== null) {
        console.log("Entro en EDICION")
        this.usuarios[this.usuarioEdicion] = {
          ...this.nuevoUsuario
        };
        console.log("Objeto guardado en jason: ", this.nuevoUsuario)
        this.swalService.success('Usuario actualizado correctamente');
      } else {
        const usuario = { ...this.nuevoUsuario };
        this.usuarios.push(usuario);
        console.log("Objeto guardado en jason: ", usuario)
        this.swalService.success('Usuario registrado correctamente');
      }
      console.log("Datos a guardar en localStorage:", this.usuarios);
      localStorage.setItem('usuario', JSON.stringify(this.usuarios));

      this.cerrarModal(); // Cierra el modal después de registrar
    } else {
      this.swalService.errorCampos('Debes completar todos los campos.');
    }
  }

  editarUsuarioDesdeLista(usuario: any) {
    this.nuevoUsuario = { ...usuario }; // Carga los datos del usuario en el formulario
    this.esEdicion = true;
    this.usuarioEdicion = this.usuarios.findIndex (
      (p) =>
        p.nombre === usuario.nombre &&
        p.tipo === usuario.tipo
    );
    console.log("esEdicion: ",this.esEdicion)
    console.log("usuarioEdicion: ",this.usuarioEdicion)
    this.abrirModal();
  }

  limpiarFormulario() {
    this.nuevoUsuario = {
      user: '',
      password: '',
      nombre: '',
      paterno: '',
      materno: '',
      telefono: '',
      correo: '',
      tipo: '',
      especialidad: ''
    };
    this.esEdicion = false;
    console.log("esEdicion: ",this.esEdicion)
    this.usuarioEdicion = null;
  }

  cargarUsuario() {
    const usuarioGuardados = localStorage.getItem('usuario');
    if (usuarioGuardados) {
      this.usuarios = JSON.parse(usuarioGuardados);
    }
  }

  ngOnInit() {
    this.cargarUsuario();
  }
}
