import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMultiFieldComponent } from './test-multi-field.component';

describe('TestMultiFieldComponent', () => {
  let component: TestMultiFieldComponent;
  let fixture: ComponentFixture<TestMultiFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMultiFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMultiFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
