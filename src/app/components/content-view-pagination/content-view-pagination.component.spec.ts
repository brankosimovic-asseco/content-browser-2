import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewPaginationComponent } from './content-view-pagination.component';

describe('ContentViewPaginationComponent', () => {
  let component: ContentViewPaginationComponent;
  let fixture: ComponentFixture<ContentViewPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentViewPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
