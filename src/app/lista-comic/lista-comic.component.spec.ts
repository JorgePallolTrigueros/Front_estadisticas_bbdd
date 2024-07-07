import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComicComponent } from './lista-comic.component';

describe('ListaComicComponent', () => {
  let component: ListaComicComponent;
  let fixture: ComponentFixture<ListaComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaComicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
