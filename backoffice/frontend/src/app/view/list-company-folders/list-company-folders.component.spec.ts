import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListCompanyFoldersComponent} from './list-company-folders.component';

describe('ListCompanyFoldersComponent', () => {
  let component: ListCompanyFoldersComponent;
  let fixture: ComponentFixture<ListCompanyFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCompanyFoldersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListCompanyFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
