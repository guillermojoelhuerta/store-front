import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAccesoComponent } from './layout-acceso.component';

describe('LayoutAccesoComponent', () => {
  let component: LayoutAccesoComponent;
  let fixture: ComponentFixture<LayoutAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LayoutAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
