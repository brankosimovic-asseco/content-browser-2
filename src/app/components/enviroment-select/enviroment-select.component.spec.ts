import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviromentSelectComponent } from './enviroment-select.component';

describe('EnviromentSelectComponent', () => {
  let component: EnviromentSelectComponent;
  let fixture: ComponentFixture<EnviromentSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviromentSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviromentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
