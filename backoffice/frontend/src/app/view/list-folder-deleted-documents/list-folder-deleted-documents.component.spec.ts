import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListFolderDeletedDocumentsComponent} from './list-folder-deleted-documents.component';

describe('ListCompanyFoldersComponent', () => {
  let component: ListFolderDeletedDocumentsComponent;
  let fixture: ComponentFixture<ListFolderDeletedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFolderDeletedDocumentsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListFolderDeletedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
