import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListDocumentLinksComponent} from './list-document-links.component';

describe('ListDocumentLinksComponent', () => {
  let component: ListDocumentLinksComponent;
  let fixture: ComponentFixture<ListDocumentLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDocumentLinksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListDocumentLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
