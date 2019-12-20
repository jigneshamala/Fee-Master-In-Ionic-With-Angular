import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFeePage } from './show-fee.page';

describe('ShowFeePage', () => {
  let component: ShowFeePage;
  let fixture: ComponentFixture<ShowFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
