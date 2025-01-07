import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDoctoresComponent } from './lista-doctores.component';

describe('ListaDoctoresComponent', () => {
  let component: ListaDoctoresComponent;
  let fixture: ComponentFixture<ListaDoctoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListaDoctoresComponent]
    });
    fixture = TestBed.createComponent(ListaDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
