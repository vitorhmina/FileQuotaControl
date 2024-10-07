import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListCompanyTagsComponent} from './list-company-tags.component';

describe('ListCompanyTagsComponent', () => {
  let component: ListCompanyTagsComponent;
  let fixture: ComponentFixture<ListCompanyTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCompanyTagsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListCompanyTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
