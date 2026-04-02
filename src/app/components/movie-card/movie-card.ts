import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Movie } from '../../core/types';
import { UserService } from '../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-card',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input() movie!: Movie;
  @Output() movieClicked = new EventEmitter<number>();
  userService = inject(UserService)

  emitClickEvent(){
    this.movieClicked.emit(this.movie.id);
  }
}
