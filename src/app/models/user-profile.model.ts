export interface UserProfile {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly headline?: string;
  readonly bio?: string;
  readonly location?: string;
  readonly skills: string[];
  readonly experience: { company: string; role: string; years: number }[];
  readonly isOpenToWork: boolean;
}


export type MutableProfile = {
  name: string;
  email: string;
  phone?: string;
  headline?: string;
  bio?: string;
  location?: string;
  skills: string[];
  experience: { company: string; role: string; years: number }[];
  isOpenToWork: boolean;
};