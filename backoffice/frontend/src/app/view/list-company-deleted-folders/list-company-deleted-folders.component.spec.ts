import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListCompanyDeletedFoldersComponent} from './list-company-deleted-folders.component';

describe('ListCompanyFoldersComponent', () => {
  let component: ListCompanyDeletedFoldersComponent;
  let fixture: ComponentFixture<ListCompanyDeletedFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCompanyDeletedFoldersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListCompanyDeletedFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
