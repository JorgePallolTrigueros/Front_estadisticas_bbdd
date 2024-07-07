import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnimeComponent } from './lista-anime.component';

describe('ListaAnimeComponent', () => {
  let component: ListaAnimeComponent;
  let fixture: ComponentFixture<ListaAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAnimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
