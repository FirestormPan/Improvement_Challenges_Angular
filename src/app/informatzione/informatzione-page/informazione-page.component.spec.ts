import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformazionePageComponent } from './informazione-page.component';

describe('InformazionePageComponent', () => {
  let component: InformazionePageComponent;
  let fixture: ComponentFixture<InformazionePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformazionePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformazionePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
