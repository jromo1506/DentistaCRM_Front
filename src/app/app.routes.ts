import { Routes } from '@angular/router';
import { DebugComponent } from './pages/debug/debug.component';
import { UserLoginComponent } from './pages/users/user-login/user-login.component';
import { UserRegisterComponent } from './pages/users/user-register/user-register.component';
import { ListComponent } from './components/list/list.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent } from './components/table/table.component';
import { SemaforoComponent } from './components/semaforo/semaforo.component';

export const routes: Routes = [
    {path:"debug",component:DebugComponent},
    {path:"login",component:UserLoginComponent},
    {path:"registro",component:UserRegisterComponent},
    {path:"list",component:ListComponent},
    {path:"dropdown",component:DropdownComponent},
    {path:"table",component:TableComponent},
    {path:"semaforo",component:SemaforoComponent},
    
];
