import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteDetalleComponent } from './paciente-detalle.component';

describe('PacienteDetalleComponent', () => {
  let component: PacienteDetalleComponent;
  let fixture: ComponentFixture<PacienteDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PacienteDetalleComponent]
    });
    fixture = TestBed.createComponent(PacienteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
