import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListUserRolesComponent} from './list-user-roles.component';

describe('ListCompanyTagsComponent', () => {
  let component: ListUserRolesComponent;
  let fixture: ComponentFixture<ListUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserRolesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
