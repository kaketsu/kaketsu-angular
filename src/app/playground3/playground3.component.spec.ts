import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Playground3Component } from './playground3.component';

describe('PlaygroundComponent', () => {
  let component: Playground3Component;
  let fixture: ComponentFixture<Playground3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Playground3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Playground3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
