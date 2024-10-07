import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateUserCompanyComponent} from './update-user-company.component';

describe('CreateFolderComponent', () => {
  let component: UpdateUserCompanyComponent;
  let fixture: ComponentFixture<UpdateUserCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateUserCompanyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateUserCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
