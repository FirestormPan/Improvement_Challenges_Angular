import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawRandomDareComponent } from './random-draw.component';

describe('DrawRandomDareComponent', () => {
  let component: DrawRandomDareComponent;
  let fixture: ComponentFixture<DrawRandomDareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawRandomDareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawRandomDareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
