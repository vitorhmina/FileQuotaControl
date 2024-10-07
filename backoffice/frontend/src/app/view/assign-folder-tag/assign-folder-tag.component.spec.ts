import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignFolderTagComponent} from './assign-folder-tag.component';

describe('GenerateFolderLinkComponent', () => {
  let component: AssignFolderTagComponent;
  let fixture: ComponentFixture<AssignFolderTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignFolderTagComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssignFolderTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
