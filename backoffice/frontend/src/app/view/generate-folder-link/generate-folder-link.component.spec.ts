import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenerateFolderLinkComponent} from './generate-folder-link.component';

describe('GenerateFolderLinkComponent', () => {
  let component: GenerateFolderLinkComponent;
  let fixture: ComponentFixture<GenerateFolderLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateFolderLinkComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenerateFolderLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
