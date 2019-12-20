import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInfromationPage } from './show-infromation.page';

describe('ShowInfromationPage', () => {
  let component: ShowInfromationPage;
  let fixture: ComponentFixture<ShowInfromationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInfromationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInfromationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
