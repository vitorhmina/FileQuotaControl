import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteUserCompanyComponent} from './delete-user-company.component';

describe('GenerateDocumentLinkComponent', () => {
  let component: DeleteUserCompanyComponent;
  let fixture: ComponentFixture<DeleteUserCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserCompanyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteUserCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
