import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaywiseComponent } from './daywise.component';

describe('DaywiseComponent', () => {
  let component: DaywiseComponent;
  let fixture: ComponentFixture<DaywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaywiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
