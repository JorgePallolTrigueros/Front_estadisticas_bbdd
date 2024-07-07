import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaLibrosComponent } from './estadistica-libros.component';

describe('EstadisticaLibrosComponent', () => {
  let component: EstadisticaLibrosComponent;
  let fixture: ComponentFixture<EstadisticaLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaLibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
