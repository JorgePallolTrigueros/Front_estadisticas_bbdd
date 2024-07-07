import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaJuegosEmuladorComponent } from './estadistica-juegos-emulador.component';

describe('EstadisticaJuegosEmuladorComponent', () => {
  let component: EstadisticaJuegosEmuladorComponent;
  let fixture: ComponentFixture<EstadisticaJuegosEmuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaJuegosEmuladorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaJuegosEmuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
