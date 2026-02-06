import { Routes } from '@angular/router';
import { ProfileWizard } from './components/profile-wizard/profile-wizard';

export const routes: Routes = [
  { path: '', component: ProfileWizard },
  { path: '**', redirectTo: '' }
];
