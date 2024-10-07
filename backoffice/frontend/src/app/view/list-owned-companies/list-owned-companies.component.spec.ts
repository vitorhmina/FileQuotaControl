import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListOwnedCompaniesComponent} from './list-owned-companies.component';

describe('ListCompaniesComponent', () => {
  let component: ListOwnedCompaniesComponent;
  let fixture: ComponentFixture<ListOwnedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOwnedCompaniesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListOwnedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
