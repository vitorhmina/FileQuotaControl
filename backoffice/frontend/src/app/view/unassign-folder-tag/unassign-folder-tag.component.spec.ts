import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnassignFolderTagComponent} from './unassign-folder-tag.component';

describe('GenerateFolderLinkComponent', () => {
  let component: UnassignFolderTagComponent;
  let fixture: ComponentFixture<UnassignFolderTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnassignFolderTagComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnassignFolderTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
