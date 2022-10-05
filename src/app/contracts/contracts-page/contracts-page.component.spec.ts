import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsPageComponent } from './contracts-page.component';

describe('ContractsPageComponent', () => {
  let component: ContractsPageComponent;
  let fixture: ComponentFixture<ContractsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
