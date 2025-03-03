import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableproductsComponent } from './reusableproducts.component';

describe('ReusableproductsComponent', () => {
  let component: ReusableproductsComponent;
  let fixture: ComponentFixture<ReusableproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReusableproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
