import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDocumentTagsComponent} from './list-document-tags.component';

describe('ListCompanyTagsComponent', () => {
  let component: ListDocumentTagsComponent;
  let fixture: ComponentFixture<ListDocumentTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDocumentTagsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListDocumentTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
