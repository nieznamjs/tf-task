import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhRepositoriesComponent } from './gh-repositories.component';

describe('GhRepositoriesComponent', () => {
  let component: GhRepositoriesComponent;
  let fixture: ComponentFixture<GhRepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhRepositoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
