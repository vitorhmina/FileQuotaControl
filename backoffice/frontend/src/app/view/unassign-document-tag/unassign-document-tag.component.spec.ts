import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnassignDocumentTagComponent} from './unassign-document-tag.component';

describe('GenerateFolderLinkComponent', () => {
  let component: UnassignDocumentTagComponent;
  let fixture: ComponentFixture<UnassignDocumentTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnassignDocumentTagComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnassignDocumentTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
