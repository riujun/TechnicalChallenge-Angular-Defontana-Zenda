import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetSummaryComponent } from './alphabet-summary.component';

describe('AlphabetSummaryComponent', () => {
  let component: AlphabetSummaryComponent;
  let fixture: ComponentFixture<AlphabetSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlphabetSummaryComponent]
    });
    fixture = TestBed.createComponent(AlphabetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
