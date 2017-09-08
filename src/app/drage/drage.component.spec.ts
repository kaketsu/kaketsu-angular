import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrageComponent } from './drage.component';

describe('DrageComponent', () => {
  let component: DrageComponent;
  let fixture: ComponentFixture<DrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
