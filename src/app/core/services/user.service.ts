import { Injectable, signal } from '@angular/core';
import { Movie, UserProfile } from '../types';

const FAV_KEY: string = 'Favorites';
const SEEN_KEY: string = 'Seen';
const PROFILE_KEY = 'UserProfile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private favorites = signal<Movie[]>(this.loadFromStorage(FAV_KEY, []));
  private seen = signal<Movie[]>(this.loadFromStorage(SEEN_KEY, []));
  profile = signal<UserProfile>(this.loadFromStorage(PROFILE_KEY, {
    name: 'Utente Test',
    bio: 'Appassionato di cinema',
    avatarUrl: '',
  }));

  get userFavorites() {
    return this.favorites.asReadonly();
  }

  get userSeenMovies() {
    return this.seen.asReadonly();
  }

  isFavorite(movieId: number): boolean {
    return this.userFavorites().some(m => m.id === movieId);
  }

  addFavorite(movie: Movie) {
    this.favorites.update(list => [...list, movie]);
    this.saveToStorage(FAV_KEY, this.userFavorites());
  }

  removeFavorite(movieId: number) {
    this.favorites.update(list => list.filter(m => m.id !== movieId));
    this.saveToStorage(FAV_KEY, this.userFavorites());
  }

  isSeen(movieId: number): boolean {
    return this.userSeenMovies().some(m => m.id === movieId);
  }

  addSeen(movie: Movie) {
    this.seen.update(list => [...list, movie]);
    this.saveToStorage(SEEN_KEY, this.userSeenMovies());
  }

  removeSeen(movieId: number) {
    this.seen.update(list => list.filter(m => m.id !== movieId));
    this.saveToStorage(SEEN_KEY, this.userSeenMovies());
  }

  updateProfile(updated: UserProfile) {
    this.profile.set(updated);
    this.saveToStorage(PROFILE_KEY, updated);
  }

  private loadFromStorage<T>(key: string, fallback: T) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  }

  private saveToStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
