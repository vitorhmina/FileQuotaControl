import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApiIndexComponent} from './api-index.component';

describe('ApiIndexComponent', () => {
  let component: ApiIndexComponent;
  let fixture: ComponentFixture<ApiIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiIndexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ApiIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
