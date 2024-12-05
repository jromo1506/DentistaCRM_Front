import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core'; // Importa esto
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configuración de rutas
    importProvidersFrom(HttpClientModule), // Añade HttpClientModule aquí
  ],
};
