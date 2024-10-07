import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenerateDocumentLinkComponent} from './generate-document-link.component';

describe('GenerateDocumentLinkComponent', () => {
  let component: GenerateDocumentLinkComponent;
  let fixture: ComponentFixture<GenerateDocumentLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateDocumentLinkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenerateDocumentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
