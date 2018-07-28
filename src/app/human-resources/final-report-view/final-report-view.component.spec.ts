import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalReportViewComponent } from './final-report-view.component';

describe('FinalReportViewComponent', () => {
  let component: FinalReportViewComponent;
  let fixture: ComponentFixture<FinalReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
