import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DownloadDocumentComponent} from './download-document.component';

describe('ListDocumentLinksComponent', () => {
  let component: DownloadDocumentComponent;
  let fixture: ComponentFixture<DownloadDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadDocumentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DownloadDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
