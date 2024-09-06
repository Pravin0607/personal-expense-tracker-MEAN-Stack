import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthwiseComponent } from './monthwise.component';

describe('MonthwiseComponent', () => {
  let component: MonthwiseComponent;
  let fixture: ComponentFixture<MonthwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthwiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
