import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaSerieComponent } from './estadistica-serie.component';

describe('EstadisticaSerieComponent', () => {
  let component: EstadisticaSerieComponent;
  let fixture: ComponentFixture<EstadisticaSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaSerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
