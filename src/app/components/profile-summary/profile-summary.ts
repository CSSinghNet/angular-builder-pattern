// src/app/components/profile-summary/profile-summary.component.ts
import { Component, input } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-summary',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  template: `<div class="summary-card">
    <!-- Header Section -->
    <div class="header">
      <div class="avatar-placeholder" aria-hidden="true">👤</div>

      <div class="basic-info">
        <h2>{{ profile().name }}</h2>

        <p class="headline">
          {{ profile().headline || 'Professional Profile' }}
        </p>

        <p class="location-email">
          @if (profile().location) {
            <span>📍 {{ profile().location }}</span>
          }
          @if (profile().email) {
            <span> • {{ profile().email }}</span>
          }
          @if (profile().phone) {
            <span> • {{ profile().phone }}</span>
          }
        </p>

        @if (profile().isOpenToWork) {
          <p class="availability">🌟 Open to new opportunities</p>
        }
      </div>
    </div>

    <!-- About Section -->
    @if (profile().bio?.trim()) {
      <div class="section">
        <h3>About</h3>
        <p>{{ profile().bio }}</p>
      </div>
    }

    <!-- Skills Section -->
    @if (profile().skills?.length) {
      <div class="section">
        <h3>Skills</h3>
        <div class="skills-list">
          @for (skill of profile().skills; track skill) {
            <span class="skill-tag">{{ skill }}</span>
          } @empty {
            <span class="empty-message">No skills listed</span>
          }
        </div>
      </div>
    } @else {
      <!-- Optional: agar skills nahi hai to kuch dikhana chahe to -->
    }

    <!-- Experience Section -->
    @if (profile().experience?.length) {
      <div class="section">
        <h3>Experience</h3>
        @for (exp of profile().experience; track $index) {
          <div class="experience-item">
            <h4>{{ exp.role }} at {{ exp.company }}</h4>
            <p class="duration">{{ exp.years }} {{ exp.years === 1 ? 'year' : 'years' }}</p>
          </div>
        } @empty {
          <p class="empty-message">No experience added yet</p>
        }
      </div>
    }

    <!-- Footer -->
    <div class="footer">
      <p>Profile generated on {{ today | date: 'mediumDate' }}</p>
    </div>
  </div>`,
  styles: [
    `
      .summary-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 32px;
        max-width: 800px;
        margin: 0 auto;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 32px;
      }

      .avatar-placeholder {
        width: 100px;
        height: 100px;
        background: #007bff;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
      }

      .basic-info h2 {
        margin: 0;
        font-size: 2.2rem;
      }

      .headline {
        font-size: 1.3rem;
        color: #555;
        margin: 8px 0;
      }

      .location-email {
        color: #666;
        font-size: 1.1rem;
      }

      .availability {
        color: #28a745;
        font-weight: bold;
        margin-top: 12px;
      }

      .section {
        margin-bottom: 32px;
      }

      .section h3 {
        font-size: 1.5rem;
        margin-bottom: 16px;
        border-bottom: 2px solid #eee;
        padding-bottom: 8px;
      }

      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .skill-tag {
        background: #e9ecef;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.95rem;
      }

      .experience-item {
        margin-bottom: 20px;
      }

      .experience-item h4 {
        margin: 0 0 4px;
      }

      .duration {
        color: #666;
        font-style: italic;
      }

      .footer {
        text-align: center;
        color: #888;
        font-size: 0.9rem;
        margin-top: 40px;
      }
    `,
  ],
})
export class ProfileSummary {
  profile = input.required<UserProfile>();
  today = new Date();
}
