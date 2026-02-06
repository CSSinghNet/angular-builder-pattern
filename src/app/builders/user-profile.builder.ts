import { MutableProfile, UserProfile } from '../models/user-profile.model';

export class UserProfileBuilder {
  private profile: MutableProfile = {
    name: '',
    email: '',
    skills: [],
    experience: [],
    isOpenToWork: false
  };

  constructor(name: string, email: string) {
    if (!name || !email) {
      throw new Error('Name and Email are mandatory!');
    }
    this.profile.name = name;
    this.profile.email = email;
  }

  setPhone(phone: string): this {
    this.profile.phone = phone;
    return this;
  }

  setHeadline(headline: string): this {
    this.profile.headline = headline;
    return this;
  }

  setBio(bio: string): this {
    this.profile.bio = bio;
    return this;
  }

  setLocation(location: string): this {
    this.profile.location = location;
    return this;
  }

  addSkill(skill: string): this {
    if (skill.trim()) {
      this.profile.skills!.push(skill.trim());
    }
    return this;
  }

  addExperience(company: string, role: string, years: number): this {
    if (company && role && years > 0) {
      this.profile.experience!.push({ company, role, years });
    }
    return this;
  }

  setOpenToWork(isOpen: boolean = true): this {
    this.profile.isOpenToWork = isOpen;
    return this;
  }

  build(): UserProfile {
    return {
      name: this.profile.name,
      email: this.profile.email,
      phone: this.profile.phone,
      headline: this.profile.headline,
      bio: this.profile.bio,
      location: this.profile.location,
      skills: [...this.profile.skills],           // frozen copy
      experience: [...this.profile.experience],
      isOpenToWork: this.profile.isOpenToWork
    };
  }

  // Bonus: JSON ready for API
  toJSON(): string {
    return JSON.stringify(this.build());
  }
}