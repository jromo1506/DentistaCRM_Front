import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUserComponent } from 'src/app/components/forms/form-user/form-user.component';
import { UserService } from 'src/app/services/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-list-element',
  standalone: true,
  imports: [CommonModule, UserModalComponent],
  templateUrl: './user-list-element.component.html',
  styleUrls: ['./user-list-element.component.scss']
})
export class UserListElementComponent implements OnInit {
  usuarios: Array<any> = [];
  selectedUser: any = null;

  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarusuarios();
  }

  cargarusuarios() {
    this.userService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  eliminarUsuario(usuario: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${usuario.nombre}?`)) {
      this.userService.eliminarUsuario(usuario._id).subscribe(
        () => {
          this.usuarios = this.usuarios.filter(u => u._id !== usuario._id);
          alert(`Usuario ${usuario.nombre} eliminado correctamente.`);
        },
        (error) => {
          console.error('Error al eliminar el usuario', error);
          alert('Error al eliminar el usuario. Inténtalo nuevamente.');
        }
      );
    }
  }
  

  verDetalles(usuario: any) {
    this.selectedUser = usuario;
    this.userModal.showModal = true;
  }
}