import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJuegosEmuladorComponent } from './lista-juegos-emulador.component';

describe('ListaJuegosEmuladorComponent', () => {
  let component: ListaJuegosEmuladorComponent;
  let fixture: ComponentFixture<ListaJuegosEmuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaJuegosEmuladorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaJuegosEmuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
