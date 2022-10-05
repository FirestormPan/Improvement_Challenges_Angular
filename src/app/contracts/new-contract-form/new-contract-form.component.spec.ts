import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContractFormComponent } from './new-contract-form.component';

describe('NewContractFormComponent', () => {
  let component: NewContractFormComponent;
  let fixture: ComponentFixture<NewContractFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContractFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContractFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
