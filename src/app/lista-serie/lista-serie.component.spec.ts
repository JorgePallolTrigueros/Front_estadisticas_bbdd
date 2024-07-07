import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSerieComponent } from './lista-serie.component';

describe('ListaSerieComponent', () => {
  let component: ListaSerieComponent;
  let fixture: ComponentFixture<ListaSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
