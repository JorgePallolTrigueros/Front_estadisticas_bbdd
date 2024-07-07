import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaMangaVoseComponent } from './estadistica-manga-vose.component';

describe('EstadisticaMangaVoseComponent', () => {
  let component: EstadisticaMangaVoseComponent;
  let fixture: ComponentFixture<EstadisticaMangaVoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaMangaVoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaMangaVoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
