import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaComicComponent } from './estadistica-comic.component';

describe('EstadisticaComicComponent', () => {
  let component: EstadisticaComicComponent;
  let fixture: ComponentFixture<EstadisticaComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaComicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
