import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWizard } from './profile-wizard';

describe('ProfileWizard', () => {
  let component: ProfileWizard;
  let fixture: ComponentFixture<ProfileWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileWizard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
