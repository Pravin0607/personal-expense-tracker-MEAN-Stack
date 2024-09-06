import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenDatesComponent } from './between-dates.component';

describe('BetweenDatesComponent', () => {
  let component: BetweenDatesComponent;
  let fixture: ComponentFixture<BetweenDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetweenDatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetweenDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
