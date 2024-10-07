import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateCompanyComponent} from './update-company.component';

describe('CreateFolderComponent', () => {
  let component: UpdateCompanyComponent;
  let fixture: ComponentFixture<UpdateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCompanyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
