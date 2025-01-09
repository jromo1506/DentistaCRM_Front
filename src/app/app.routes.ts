import { Routes } from '@angular/router';
import { DebugComponent } from './pages/debug/debug.component';
import { UserLoginComponent } from './pages/users/user-login/user-login.component';
import { UserRegisterComponent } from './pages/users/user-register/user-register.component';
import { ListComponent } from './components/list/list.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent } from './components/table/table.component';
import { SemaforoComponent } from './components/mensajes/semaforo/semaforo.component';
import { ListElementCitaComponent } from './components/list-elements/list-element-cita/list-element-cita.component';
import { ListCitaComponent } from './components/list-elements/list-cita/list-cita.component';
import { PacienteDetalleComponent } from './components/pacientes/paciente-detalle/paciente-detalle.component';
import { ListaPacientesComponent } from './components/pacientes/lista-pacientes/lista-pacientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { PerfilComponent } from './components/pacientes/perfil/perfil.component';
import { ListMensajeComponent } from './components/mensajes/list-mensaje/list-mensaje.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

export const routes: Routes = [
    { path: "debug", component: DebugComponent },
    { path: "login", component: UserLoginComponent },
    { path: "registro", component: UserRegisterComponent },
    { path: "list", component: ListComponent },
    { path: "dropdown", component: DropdownComponent },
    { path: "table", component: TableComponent },
    { path: "semaforo", component: SemaforoComponent },
    { path: "cita", component: ListElementCitaComponent },
    { path: "lista-citas", component: ListCitaComponent },
    { path: "lista-usuarios", component:UserListComponent},
    { path: "lista-mensajes", component: MensajesComponent },
    { path: "detallespaciente/:id", component: PacienteDetalleComponent },
    { path: "perfil/:name/:id", component: PerfilComponent },
    { path: "lista-pacientes", component:PacientesComponent},
    { path: "configuracion", component:ConfiguracionComponent},
    { path: "calendario", component: CalendarioComponent},

    
];
