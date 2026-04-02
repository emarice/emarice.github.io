import { Component, inject } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatCardModule, MatIconModule, MatTooltipModule, MovieCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  movies = inject(MovieService);
  userService = inject(UserService);
  router = inject(Router)

  constructor() {
    // Caricamento automatico
    this.movies.loadPopular();
  }

  handleRedirect(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}