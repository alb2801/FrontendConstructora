import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarCancelarSolicitudComponent } from './aceptar-cancelar-solicitud.component';

describe('AceptarCancelarSolicitudComponent', () => {
  let component: AceptarCancelarSolicitudComponent;
  let fixture: ComponentFixture<AceptarCancelarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptarCancelarSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarCancelarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
