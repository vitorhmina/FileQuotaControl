import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommonComponent} from './common.component';
import {TestModule} from '../../../tests/test.module';

describe('CommonComponent', () => {
  let component: CommonComponent;
  let fixture: ComponentFixture<CommonComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    })
      .compileComponents().then(() => done ? done() : null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
