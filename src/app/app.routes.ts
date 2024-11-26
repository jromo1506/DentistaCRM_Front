import { Routes } from '@angular/router';
import { DebugComponent } from './pages/debug/debug.component';
import { UserLoginComponent } from './pages/users/user-login/user-login.component';
import { UserRegisterComponent } from './pages/users/user-register/user-register.component';

export const routes: Routes = [
    {path:"debug",component:DebugComponent},
    {path:"login",component:UserLoginComponent},
    {path:"registro",component:UserRegisterComponent}
];
