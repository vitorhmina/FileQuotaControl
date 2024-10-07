import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUserTypeComponent} from './create-user-type.component';

describe('RegisterCompanyComponent', () => {
  let component: CreateUserTypeComponent;
  let fixture: ComponentFixture<CreateUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserTypeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
