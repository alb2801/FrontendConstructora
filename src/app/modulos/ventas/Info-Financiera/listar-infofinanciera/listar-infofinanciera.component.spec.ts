import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInfofinancieraComponent } from './listar-infofinanciera.component';

describe('ListarInfofinancieraComponent', () => {
  let component: ListarInfofinancieraComponent;
  let fixture: ComponentFixture<ListarInfofinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInfofinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInfofinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
