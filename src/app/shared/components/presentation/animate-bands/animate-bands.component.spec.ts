import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateBandsComponent } from './animate-bands.component';

describe('AnimateBandsComponent', () => {
  let component: AnimateBandsComponent;
  let fixture: ComponentFixture<AnimateBandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimateBandsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimateBandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
