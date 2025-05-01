import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemaforoComponent } from '../semaforo/semaforo.component';
import { DatePipe } from '@angular/common';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-element-mensaje',
  standalone: true,
  imports: [CommonModule, SemaforoComponent],
  templateUrl: './list-element-mensaje.component.html',
  styleUrls: ['./list-element-mensaje.component.scss']
})
export class ListElementMensajeComponent {
  @Input() mensaje: any;
  @Input() fecha: string='';

  constructor(
    private mensajesService: MensajesService,
    private router: Router
  ) { }

  eliminarMensaje(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      this.mensajesService.deleteMensaje(id).subscribe(
        (res) => {
          alert('Mensaje eliminado correctamente.');
          // Aquí puedes implementar lógica para refrescar la lista de mensajes
          window.location.reload(); // Ejemplo sencillo para recargar la lista
        },
        (err) => {
          console.error('Error al eliminar el mensaje:', err);
          alert('Ocurrió un error al eliminar el mensaje.');
        }
      );
    }
  }

  verChat(telefono: string): void {
    localStorage.setItem('chat-telefono', telefono);
    this.router.navigate(['/chats']);
  }


}
