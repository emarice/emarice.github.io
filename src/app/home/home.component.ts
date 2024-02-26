import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DiscoverResponse, Movie } from '../shared/types/types';
import { Router, RouterModule } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {
    this.getPopular();
  }

  getPopular(){
    this.movieService.popularThisYear().subscribe({
      next: (result: DiscoverResponse) => {
        this.movies = result.results;
      }
    })
  }
  showDetails(movie: Movie) {
    this.router.navigateByUrl(`movie/${movie.id}`)
  }
}
