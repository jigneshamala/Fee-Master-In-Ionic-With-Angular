import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraionPage } from './registraion.page';

describe('RegistraionPage', () => {
  let component: RegistraionPage;
  let fixture: ComponentFixture<RegistraionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
