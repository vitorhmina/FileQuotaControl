import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListFolderTagsComponent} from './list-folder-tags.component';

describe('ListCompanyTagsComponent', () => {
  let component: ListFolderTagsComponent;
  let fixture: ComponentFixture<ListFolderTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFolderTagsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListFolderTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
