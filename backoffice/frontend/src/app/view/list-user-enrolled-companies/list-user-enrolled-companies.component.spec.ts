import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListUserEnrolledCompaniesComponent} from './list-user-enrolled-companies.component';

describe('ListCompaniesComponent', () => {
  let component: ListUserEnrolledCompaniesComponent;
  let fixture: ComponentFixture<ListUserEnrolledCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserEnrolledCompaniesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListUserEnrolledCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
