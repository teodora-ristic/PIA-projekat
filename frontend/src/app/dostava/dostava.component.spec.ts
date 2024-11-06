import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavaComponent } from './dostava.component';

describe('DostavaComponent', () => {
  let component: DostavaComponent;
  let fixture: ComponentFixture<DostavaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostavaComponent]
    });
    fixture = TestBed.createComponent(DostavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
