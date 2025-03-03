import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritebtnComponent } from './favoritebtn.component';

describe('FavoritebtnComponent', () => {
  let component: FavoritebtnComponent;
  let fixture: ComponentFixture<FavoritebtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritebtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritebtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
