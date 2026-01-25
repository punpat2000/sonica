import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedUvCuringComponent } from './led-uv-curing.component';

describe('LedUvCuringComponent', () => {
  let component: LedUvCuringComponent;
  let fixture: ComponentFixture<LedUvCuringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LedUvCuringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedUvCuringComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
