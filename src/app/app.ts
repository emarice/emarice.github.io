import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from './core/services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  router = inject(Router);
  hideToolbar = signal<boolean>(false);

  constructor() {
    effect(() => {
      document.body.classList.toggle('dark-theme', this.theme.darkMode());
      document.body.classList.toggle('light-theme', !this.theme.darkMode());
    });

    effect(() => {
      this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
        let route = this.router.routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        this.hideToolbar.set(route.snapshot.data['hideToolbar'] === true);
      });
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/");
  }
}
