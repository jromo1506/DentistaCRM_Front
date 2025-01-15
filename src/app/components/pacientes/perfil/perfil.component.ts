import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,ModalComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {




  showModal: boolean = false;

  paciente:any;

  

  onCloseModal() {
    this.showModal = false;
  }

  
  constructor(private route: ActivatedRoute,private pacienteService:PacientesService) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.pacienteService.getPacienteById(id).subscribe(res=>{
        this.paciente=res;
        console.log(this.paciente,"PACIENTE");
      });
    }
  }


  register(){
    this.showModal = true;
  }

    
  

    


}
