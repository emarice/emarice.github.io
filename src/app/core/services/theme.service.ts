import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  darkMode = signal(true);
  
  constructor() {
    const saved = localStorage.getItem('theme');
    this.darkMode.set(saved !== 'light');
  }

  toggle() {
    this.darkMode.update((v) => {
      localStorage.setItem('theme', v ? 'light' : 'dark');
      return !v;
    });
  }
}
