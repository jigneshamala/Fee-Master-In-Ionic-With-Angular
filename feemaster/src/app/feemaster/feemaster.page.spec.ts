import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeemasterPage } from './feemaster.page';

describe('FeemasterPage', () => {
  let component: FeemasterPage;
  let fixture: ComponentFixture<FeemasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeemasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeemasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
