import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaAnimeVoseComponent } from './estadistica-anime-vose.component';

describe('EstadisticaAnimeVoseComponent', () => {
  let component: EstadisticaAnimeVoseComponent;
  let fixture: ComponentFixture<EstadisticaAnimeVoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaAnimeVoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaAnimeVoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
