import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { UserProfile } from '../../core/types';

const PREFS_KEY = 'UserPrefs';

@Component({
  selector: 'app-profile',
  imports: [
    RouterModule, FormsModule, ReactiveFormsModule, JsonPipe,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatChipsModule, MatSelectModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true
})
export class ProfileComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  private fb = inject(FormBuilder);
  private prefsSubscription!: Subscription;

  // ── Template-driven form ──────────────────────────────────────────────────
  profileDraft: UserProfile = { ...this.userService.profile() };
  profileSaved = false;

  saveProfile(form: NgForm) {
    if (form.invalid) return;
    this.userService.updateProfile({ ...this.profileDraft });
    this.profileSaved = true;
    setTimeout(() => this.profileSaved = false, 3000);
  }

  resetProfile(form: NgForm) {
    this.profileDraft = { ...this.userService.profile() };
    form.resetForm(this.profileDraft);
  }

  // ── Reactive form ─────────────────────────────────────────────────────────
  availableGenres = ['Azione', 'Commedia', 'Dramma', 'Horror', 'Sci-Fi', 'Thriller', 'Animazione', 'Documentario'];

  defaultPrefs = { minRating: 6, genres: [] as string[], language: 'it' };

  prefsForm = this.fb.group({
    minRating: [6, [Validators.required, Validators.min(0), Validators.max(10)]],
    genres: [[] as string[]],
    language: ['it', Validators.required],
  });

  prefsSaved = false;

  ngOnInit() {
    // Carica preferenze salvate
    const saved = localStorage.getItem(PREFS_KEY);
    if (saved) this.prefsForm.setValue(JSON.parse(saved));

    // valueChanges — utile per spiegare la reattività
    this.prefsSubscription = this.prefsForm.valueChanges.subscribe(val => {
      console.log('[ReactiveForm] valueChanges:', val);
    });
  }

  ngOnDestroy() {
    this.prefsSubscription.unsubscribe();
  }

  isGenreSelected(genre: string): boolean {
    return (this.prefsForm.get('genres')?.value as string[])?.includes(genre) ?? false;
  }

  toggleGenre(genre: string) {
    const current: string[] = (this.prefsForm.get('genres')?.value as string[]) ?? [];
    const updated = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    this.prefsForm.patchValue({ genres: updated });
  }

  savePrefs() {
    if (this.prefsForm.invalid) return;
    localStorage.setItem(PREFS_KEY, JSON.stringify(this.prefsForm.value));
    this.prefsSaved = true;
    setTimeout(() => this.prefsSaved = false, 3000);
  }

  // ── Azioni film ───────────────────────────────────────────────────────────
  removeSeen(event: Event, movieId: number) {
    event.stopPropagation(); // evita navigazione alla card
    this.userService.removeSeen(movieId);
  }

  removeFavorite(event: Event, movieId: number) {
    event.stopPropagation();
    this.userService.removeFavorite(movieId);
  }
}
