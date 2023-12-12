import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisViewComponent } from './synopsis-view.component';

describe('SynopsisViewComponent', () => {
  let component: SynopsisViewComponent;
  let fixture: ComponentFixture<SynopsisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SynopsisViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SynopsisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
