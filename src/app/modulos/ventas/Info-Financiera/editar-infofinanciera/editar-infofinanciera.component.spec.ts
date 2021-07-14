import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfofinancieraComponent } from './editar-infofinanciera.component';

describe('EditarInfofinancieraComponent', () => {
  let component: EditarInfofinancieraComponent;
  let fixture: ComponentFixture<EditarInfofinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInfofinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInfofinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
