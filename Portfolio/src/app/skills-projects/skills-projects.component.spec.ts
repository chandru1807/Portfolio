import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsProjectsComponent } from './skills-projects.component';

describe('SkillsProjectsComponent', () => {
  let component: SkillsProjectsComponent;
  let fixture: ComponentFixture<SkillsProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
