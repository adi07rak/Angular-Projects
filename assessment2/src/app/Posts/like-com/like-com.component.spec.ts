import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeComComponent } from './like-com.component';

describe('LikeComComponent', () => {
  let component: LikeComComponent;
  let fixture: ComponentFixture<LikeComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
