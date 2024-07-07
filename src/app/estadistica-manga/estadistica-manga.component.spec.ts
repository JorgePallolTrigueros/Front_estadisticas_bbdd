import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaMangaComponent } from './estadistica-manga.component';

describe('EstadisticaMangaComponent', () => {
  let component: EstadisticaMangaComponent;
  let fixture: ComponentFixture<EstadisticaMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaMangaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadisticaMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
