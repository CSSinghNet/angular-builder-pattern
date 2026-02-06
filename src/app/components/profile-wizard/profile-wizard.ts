import { Component, inject, signal } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  FormArray, 
  Validators, 
  ReactiveFormsModule,
  FormControl 
} from '@angular/forms';
import { UserProfileBuilder } from '../../builders/user-profile.builder';
import { UserProfile } from '../../models/user-profile.model';
import { JsonPipe } from '@angular/common';
import { ProfileSummary } from '../profile-summary/profile-summary';

@Component({
  selector: 'app-profile-wizard',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,ProfileSummary],
  templateUrl: './profile-wizard.html',
  styleUrl: './profile-wizard.css'
})
export class ProfileWizard {

  // Steps
  currentStep = signal(1);
  readonly totalSteps = 5; // 4 steps + summary

  // Main Reactive Form
  profileForm: FormGroup;

  // Temporary controls for adding new items (reactive)
  newSkillControl: FormControl<string>;
  newCompanyControl: FormControl<string>;
  newRoleControl: FormControl<string>;
  newYearsControl: FormControl<number | null>;

  // Final output
  finalProfile = signal<UserProfile | null>(null);

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      headline: [''],
      bio: [''],
      location: [''],
      skills: this.fb.array<string>([]),
      experiences: this.fb.array<FormGroup>([]),
      isOpenToWork: [false]
    });

    this.newSkillControl   = fb.control('', { nonNullable: true });
    this.newCompanyControl = fb.control('', { nonNullable: true });
    this.newRoleControl    = fb.control('', { nonNullable: true });
    this.newYearsControl   = fb.control<number | null>(null);
  }

  // Helpers for FormArrays
  get skillsArray(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  get experiencesArray(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  // Add Skill
  addSkill() {
    const value = this.newSkillControl.value?.trim();
    if (value) {
      this.skillsArray.push(this.fb.control(value));
      this.newSkillControl.reset();
    }
  }

  removeSkill(index: number) {
    this.skillsArray.removeAt(index);
  }

  // Add Experience
  addExperience() {
    const company = this.newCompanyControl.value?.trim();
    const role = this.newRoleControl.value?.trim();
    const years = this.newYearsControl.value;

    if (company && role && typeof years === 'number' && years >= 1) {
      const expGroup = this.fb.group({
        company: [company, Validators.required],
        role: [role, Validators.required],
        years: [years, [Validators.required, Validators.min(1)]]
      });
      this.experiencesArray.push(expGroup);
      this.newCompanyControl.reset();
      this.newRoleControl.reset();
      this.newYearsControl.reset();
    }
  }

  removeExperience(index: number) {
    this.experiencesArray.removeAt(index);
  }

  // Navigation
  nextStep() {
    const step = this.currentStep();
    if (step < this.totalSteps) {
      // Basic validation enforcement on step 1
      if (step === 1) {
        this.profileForm.get('name')?.markAsTouched();
        this.profileForm.get('email')?.markAsTouched();
        if (this.profileForm.get('name')?.invalid || this.profileForm.get('email')?.invalid) {
          return;
        }
      }
      this.currentStep.set(step + 1);
    }
  }

  prevStep() {
    const step = this.currentStep();
    if (step > 1) {
      this.currentStep.set(step - 1);
    }
  }

  // Build final profile
  buildProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const value = this.profileForm.value;

    try {
      const builder = new UserProfileBuilder(value.name, value.email)
        .setPhone(value.phone || '')
        .setHeadline(value.headline || '')
        .setBio(value.bio || '')
        .setLocation(value.location || '')
        .setOpenToWork(value.isOpenToWork);

      value.skills.forEach((skill: string) => builder.addSkill(skill));

      value.experiences.forEach((exp: { company: string; role: string; years: number }) => {
        builder.addExperience(exp.company, exp.role, exp.years);
      });

      const profile = builder.build();
      this.finalProfile.set(profile);

      console.log('Profile Built:', profile);
      this.currentStep.set(5);
    } catch (err) {
      alert((err as Error).message || 'Error building profile');
    }
  }
}