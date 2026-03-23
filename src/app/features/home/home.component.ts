import { Component, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  movies = inject(MovieService);
  userService = inject(UserService);

  constructor() {
    // Caricamento automatico
    this.movies.loadPopular();
  }
}