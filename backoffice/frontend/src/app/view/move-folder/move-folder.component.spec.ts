import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoveFolderComponent} from './move-folder.component';

describe('CreateFolderComponent', () => {
  let component: MoveFolderComponent;
  let fixture: ComponentFixture<MoveFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveFolderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoveFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
