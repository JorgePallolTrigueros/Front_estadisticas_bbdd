import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaPelisComponent } from './estadistica-pelis.component';

describe('EstadisticaPelisComponent', () => {
  let component: EstadisticaPelisComponent;
  let fixture: ComponentFixture<EstadisticaPelisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaPelisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaPelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
