import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnimeVoseComponent } from './lista-anime-vose.component';




describe('ListaAnimeVoseComponent', () => {
  let component: ListaAnimeVoseComponent;
  let fixture: ComponentFixture<ListaAnimeVoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAnimeVoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAnimeVoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
