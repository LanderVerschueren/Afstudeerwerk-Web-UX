import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtosectionComponent } from './howtosection.component';

describe('HowtosectionComponent', () => {
  let component: HowtosectionComponent;
  let fixture: ComponentFixture<HowtosectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtosectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtosectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
