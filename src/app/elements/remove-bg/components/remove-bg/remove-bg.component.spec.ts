import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBgComponent } from './remove-bg.component';

describe('RemoveBgComponent', () => {
  let component: RemoveBgComponent;
  let fixture: ComponentFixture<RemoveBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
