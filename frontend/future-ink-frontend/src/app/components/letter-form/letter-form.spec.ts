import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterForm } from './letter-form';

describe('LetterForm', () => {
  let component: LetterForm;
  let fixture: ComponentFixture<LetterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
