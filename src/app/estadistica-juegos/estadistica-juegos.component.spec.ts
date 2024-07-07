import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaJuegosComponent } from './estadistica-juegos.component';

describe('EstadisticaJuegosComponent', () => {
  let component: EstadisticaJuegosComponent;
  let fixture: ComponentFixture<EstadisticaJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaJuegosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
