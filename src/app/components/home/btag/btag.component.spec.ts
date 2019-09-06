import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtagComponent } from './btag.component';

describe('BtagComponent', () => {
  let component: BtagComponent;
  let fixture: ComponentFixture<BtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
