import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewNavigationComponent } from './content-view-navigation.component';

describe('ContentViewNavigationComponent', () => {
  let component: ContentViewNavigationComponent;
  let fixture: ComponentFixture<ContentViewNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentViewNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
