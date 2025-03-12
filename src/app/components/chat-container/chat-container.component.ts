import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {
  contacts: any[] = []; // Lista de pacientes asociados al doctor
  selectedContact: any = null; // Paciente seleccionado
  credentials: any; // Credenciales del usuario autenticado
  messageText: string ='';

  constructor(
    private mensajesService: MensajesService,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener las credenciales del usuario autenticado
    const user = this.loginService.obtenerUsuario();
    this.credentials = user?.usuario;
  
    // Si el usuario es un doctor, obtener los pacientes asociados
    if (this.credentials.tipo === "Doctor") {
      this.userService.getIdsPacientes(this.credentials.id).subscribe((pacientes: any) => {
        // Obtener los IDs de los pacientes
        const idsPacientes = pacientes.idPacientes;
  
        // Verificar que idsPacientes sea un arreglo de strings
        if (Array.isArray(idsPacientes)) {
          // Obtener los mensajes filtrados para los pacientes
          this.mensajesService.obtenerMensajesFiltrado("", idsPacientes).subscribe((mensajes: any) => {
            // Filtrar mensajes en el frontend (opcional, si el backend no lo hace)
            const mensajesFiltrados = mensajes.filter((mensaje: any) => 
              idsPacientes.includes(mensaje.idPaciente)
            );
  
            // Organizar los mensajes por paciente
            this.contacts = this.organizarMensajesPorPaciente(mensajesFiltrados);
          });
        } else {
          console.error("idsPacientes no es un arreglo válido:", idsPacientes);
        }
      });
    }
  }
  // Función para organizar los mensajes por paciente
  organizarMensajesPorPaciente(mensajes: any[]): any[] {
    const pacientesMap = new Map<string, any>();

    mensajes.forEach((mensaje) => {
      if (!pacientesMap.has(mensaje.idPaciente)) {
        pacientesMap.set(mensaje.idPaciente, {
          name: mensaje.nombrePaciente,
          phone: mensaje.telefono,
          messages: []
        });
      }
      pacientesMap.get(mensaje.idPaciente).messages.push(mensaje.mensaje);
    });

    return Array.from(pacientesMap.values());
  }

  // Función para seleccionar un contacto (paciente)
  selectContact(contact: any): void {
    this.selectedContact = contact;
  }

  sendMessage(): void {
    if (this.selectedContact && this.messageText.trim()) {
      // Agregar el nuevo mensaje al contacto seleccionado
      //this.selectedContact.messages.push(this.messageText);
      
      const newMessage = {
        text: this.messageText,
        phone: this.selectedContact.phone,
        timestamp: new Date().toISOString()
      };

      console.log('Enviando mensaje:', {
        contenido: this.messageText,
        telefonoDestino: this.selectedContact.phone,
        idPaciente: this.selectedContact.id,
        idDoctor: this.credentials.id
      });
      
      // Limpiar el campo de texto
      this.messageText = '';
    }
  }
}