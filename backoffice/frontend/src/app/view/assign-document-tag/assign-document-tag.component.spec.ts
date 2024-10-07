import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignDocumentTagComponent} from './assign-document-tag.component';

describe('GenerateFolderLinkComponent', () => {
  let component: AssignDocumentTagComponent;
  let fixture: ComponentFixture<AssignDocumentTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignDocumentTagComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssignDocumentTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
