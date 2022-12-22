import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewTableComponent } from './content-view-table.component';

describe('ContentViewTableComponent', () => {
  let component: ContentViewTableComponent;
  let fixture: ComponentFixture<ContentViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
