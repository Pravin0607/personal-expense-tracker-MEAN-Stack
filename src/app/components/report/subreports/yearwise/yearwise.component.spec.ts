import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearwiseComponent } from './yearwise.component';

describe('YearwiseComponent', () => {
  let component: YearwiseComponent;
  let fixture: ComponentFixture<YearwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearwiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
