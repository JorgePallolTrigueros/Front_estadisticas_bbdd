import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMangaVoseComponent } from './lista-manga-vose.component';

describe('ListaMangaVoseComponent', () => {
  let component: ListaMangaVoseComponent;
  let fixture: ComponentFixture<ListaMangaVoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMangaVoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMangaVoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
