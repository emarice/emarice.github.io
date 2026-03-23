import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Signal che rappresenta l'utente loggato
  private _user = signal<string | null>(null);

  // Stato derivato
  isLogged = computed(() => this._user() !== null);

  login(username: string) {
    this._user.set(username);
  }

  logout() {
    this._user.set(null);
  }

  user = this._user.asReadonly();
}
