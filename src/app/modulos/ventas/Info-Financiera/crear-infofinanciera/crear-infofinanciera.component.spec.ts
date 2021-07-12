import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInfofinancieraComponent } from './crear-infofinanciera.component';

describe('CrearInfofinancieraComponent', () => {
  let component: CrearInfofinancieraComponent;
  let fixture: ComponentFixture<CrearInfofinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInfofinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInfofinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
