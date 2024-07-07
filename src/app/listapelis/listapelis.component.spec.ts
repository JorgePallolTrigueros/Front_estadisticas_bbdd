import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapelisComponent } from './listapelis.component';

describe('ListapelisComponent', () => {
  let component: ListapelisComponent;
  let fixture: ComponentFixture<ListapelisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListapelisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListapelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
