import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { FormComponent } from 'src/app/components/forms/form/form.component';
import { MessageBoxComponent } from 'src/app/components/message-box/message-box.component';
import { ListaPacientesComponent } from 'src/app/components/pacientes/lista-pacientes/lista-pacientes.component';
import { DebugService } from 'src/app/services/debug.service';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    CommonModule,
    NotificationComponent,
    ModalComponent,
    FinderComponent,
    ListComponent,
    FormComponent,
    MessageBoxComponent,
    ListaPacientesComponent
  ],
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent {
  isModalVisible: boolean = false;
 horarios:any[]=[];

  constructor(private debugService:DebugService) {
      this.debugService.getHorarios("ce85ebbb918c7c7dfd7bad2eec6c142012d24c2b17e803e21b9d6cc98bb8472b").subscribe(res=>{
       this.horarios = res;
      });
      console.log(this.horarios);
    }

  openModal() {
    this.isModalVisible = true;
  }

  onModalClose() {
    this.isModalVisible = false;
  }


  apartar(cita:any){
    var apartar = {
      summary:"Cita de valoracion",
      description:"Cita de valoracion operatorio 1",
        startDateTime: `${cita.value.date}T${cita.value.start}:00`,
        endDateTime: `${cita.value.date}T${cita.value.end}:00`

      
    }
    this.debugService.apartarHorario("ce85ebbb918c7c7dfd7bad2eec6c142012d24c2b17e803e21b9d6cc98bb8472b","ee75200b88065c8f339787783c521b9f5bcc11242f09ac9dd1512d23a98fb485",apartar).subscribe(res=>{
      this.refrescar();
    });
    

  }


  refrescar(){
    this.debugService.getHorarios("ce85ebbb918c7c7dfd7bad2eec6c142012d24c2b17e803e21b9d6cc98bb8472b").subscribe(res=>{
      this.horarios = res;
     });
  }
}
