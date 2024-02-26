import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() info!: Movie;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  
}
