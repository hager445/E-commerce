import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingstarsComponent } from './ratingstars.component';

describe('RatingstarsComponent', () => {
  let component: RatingstarsComponent;
  let fixture: ComponentFixture<RatingstarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingstarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingstarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
