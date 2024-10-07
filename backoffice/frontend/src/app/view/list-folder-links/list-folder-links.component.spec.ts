import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListFolderLinksComponent} from './list-folder-links.component';

describe('ListFolderLinksComponent', () => {
  let component: ListFolderLinksComponent;
  let fixture: ComponentFixture<ListFolderLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFolderLinksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListFolderLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
