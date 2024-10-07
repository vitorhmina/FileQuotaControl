import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListFolderDocumentsComponent} from './list-folder-documents.component';

describe('ListCompanyFoldersComponent', () => {
  let component: ListFolderDocumentsComponent;
  let fixture: ComponentFixture<ListFolderDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFolderDocumentsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListFolderDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
