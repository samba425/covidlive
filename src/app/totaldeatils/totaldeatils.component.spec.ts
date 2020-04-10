import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaldeatilsComponent } from './totaldeatils.component';

describe('TotaldeatilsComponent', () => {
  let component: TotaldeatilsComponent;
  let fixture: ComponentFixture<TotaldeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotaldeatilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaldeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
