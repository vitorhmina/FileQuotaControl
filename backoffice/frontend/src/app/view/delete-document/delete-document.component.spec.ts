import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDocumentComponent} from './delete-document.component';

describe('GenerateDocumentLinkComponent', () => {
  let component: DeleteDocumentComponent;
  let fixture: ComponentFixture<DeleteDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDocumentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
