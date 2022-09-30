import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCardsPageComponent } from './my-cards-page.component';

describe('MyCardsPageComponent', () => {
  let component: MyCardsPageComponent;
  let fixture: ComponentFixture<MyCardsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCardsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
