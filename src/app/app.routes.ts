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
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "debug", component: DebugComponent },
    { path: "login", component: UserLoginComponent },
    { path: "registro", component: UserRegisterComponent },
    { path: "list", component: ListComponent, canActivate: [authGuard] },
    { path: "dropdown", component: DropdownComponent, canActivate: [authGuard] },
    { path: "table", component: TableComponent, canActivate: [authGuard] },
    { path: "semaforo", component: SemaforoComponent, canActivate: [authGuard]  },
    { path: "cita", component: ListElementCitaComponent, canActivate: [authGuard] },
    { path: "lista-citas", component: ListCitaComponent, canActivate: [authGuard] },
    { path: "lista-usuarios", component:UserListComponent, canActivate: [authGuard] },
    { path: "lista-mensajes", component: MensajesComponent, canActivate: [authGuard] },
    { path: "detallespaciente/:id", component: PacienteDetalleComponent, canActivate: [authGuard] },
    { path: "perfil/:name/:id", component: PerfilComponent, canActivate: [authGuard] },
    { path: "lista-pacientes", component:PacientesComponent, canActivate: [authGuard]},
    { path: "configuracion", component:ConfiguracionComponent, canActivate: [authGuard]},
    { path: "calendario", component: CalendarioComponent, canActivate: [authGuard]},

    
];
