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
  messageText: string = '';

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
    if (this.credentials.tipo === 'Doctor') {
      this.userService.getIdsPacientes(this.credentials.id).subscribe((pacientes: any) => {
        // Obtener los IDs de los pacientes
        const idsPacientes = pacientes.idPacientes;

        // Verificar que idsPacientes sea un arreglo de strings
        if (Array.isArray(idsPacientes)) {
          // Obtener los mensajes filtrados para los pacientes
          this.mensajesService.obtenerMensajesFiltrado('', idsPacientes).subscribe((mensajes: any) => {
            // Filtrar mensajes en el frontend (opcional, si el backend no lo hace)
            const mensajesFiltrados = mensajes.filter((mensaje: any) =>
              idsPacientes.includes(mensaje.idPaciente)
            );

            // Organizar los mensajes por paciente
            this.contacts = this.organizarMensajesPorPaciente(mensajesFiltrados);
          });
        } else {
          console.error('idsPacientes no es un arreglo válido:', idsPacientes);
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
          id: mensaje.idPaciente, // Asegúrate de que el mensaje tenga esta propiedad
          name: mensaje.nombrePaciente,
          phone: mensaje.telefono,
          messages: [],
        });
      }
      pacientesMap.get(mensaje.idPaciente).messages.push({
        text: mensaje.mensaje,
        sender: 'patient', // Mensajes del paciente
      });
    });

    return Array.from(pacientesMap.values());
  }

  // Función para seleccionar un contacto (paciente)
  selectContact(contact: any): void {
    // Reiniciar los mensajes del contacto seleccionado
    contact.messages = [];
  
    // Cargar mensajes del paciente
    this.mensajesService.obtenerMensajesPorPacient(contact.id).subscribe((mensajesPaciente: any) => {
      mensajesPaciente.forEach((msg: any) => {
        contact.messages.push({
          text: msg.mensaje,
          sender: 'patient', // Mensajes del paciente
          fecha: msg.fecha, // Asegúrate de que el mensaje tenga una propiedad fecha
        });
      });
  
      // Cargar mensajes del doctor
      this.mensajesService.obtenerMensajesDoctor(this.credentials.id, contact.id).subscribe((mensajesDoctor: any) => {
        mensajesDoctor.forEach((msg: any) => {
          contact.messages.push({
            text: msg.mensaje,
            sender: 'doctor', // Mensajes del doctor
            fecha: msg.fecha, // Asegúrate de que el mensaje tenga una propiedad fecha
          });
        });
  
        // Ordenar los mensajes por fecha
        contact.messages.sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      });
    });
  
    // Asignar el contacto seleccionado
    this.selectedContact = contact;
  
    // Mostrar la información del paciente en la consola
    console.log('Nombre del paciente:', contact.name);
    console.log('Id del paciente:', contact.id);
    console.log('Número telefónico del paciente:', contact.phone);
    console.log('-----------------');
  }

  // Función para enviar un mensaje
  sendMessage(): void {
    if (this.selectedContact && this.messageText.trim()) {
      const nuevoMensaje = {
        idDoctor: this.credentials.id,
        idPaciente: this.selectedContact.id,
        mensaje: this.messageText,
      };

      // Enviar el mensaje al backend
      this.mensajesService.enviarMensajeDoctor(nuevoMensaje).subscribe(
        (response) => {
          console.log('Mensaje enviado:', response);
          // Agregar el mensaje a la lista de mensajes del contacto seleccionado
          this.selectedContact.messages.push({
            text: this.messageText,
            sender: 'doctor', // Indicar que el mensaje es del doctor
          });
          this.messageText = ''; // Limpiar el campo de texto
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error);
        }
      );
    }
  }
}