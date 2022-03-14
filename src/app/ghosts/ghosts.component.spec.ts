import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostComponent } from './ghosts.component';

describe('GhostsComponent', () => {
  let component: GhostComponent;
  let fixture: ComponentFixture<GhostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GhostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
