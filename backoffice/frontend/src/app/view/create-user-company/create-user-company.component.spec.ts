import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUserCompanyComponent} from './create-user-company.component';

describe('CreateUserCompanyComponent', () => {
  let component: CreateUserCompanyComponent;
  let fixture: ComponentFixture<CreateUserCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserCompanyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateUserCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
