import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDoctorComponent } from './element-doctor.component';

describe('ElementDoctorComponent', () => {
  let component: ElementDoctorComponent;
  let fixture: ComponentFixture<ElementDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ElementDoctorComponent]
    });
    fixture = TestBed.createComponent(ElementDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
