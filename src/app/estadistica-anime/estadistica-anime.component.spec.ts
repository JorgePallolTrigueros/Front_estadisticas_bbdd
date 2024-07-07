import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaAnimeComponent } from './estadistica-anime.component';

describe('EstadisticaAnimeComponent', () => {
  let component: EstadisticaAnimeComponent;
  let fixture: ComponentFixture<EstadisticaAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaAnimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
