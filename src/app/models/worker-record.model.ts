export interface usuario{
 usuario: string;
 password: string;
 tipoUsuario: string;
 telefono: number;
}


export interface Cita {
    tratamiento: string; // Campo requerido
    fecha: Date; // Campo requerido
    observaciones: string; // Campo opcional
    pago: number; // Campo opcional
    realizo: string; // Campo opcional
  }
  
