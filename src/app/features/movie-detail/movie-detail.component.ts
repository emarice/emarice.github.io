import { Component, effect, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../core/services/user.service';
import { Movie } from '../../core/types';

@Component({
  standalone: true,
  selector: 'app-movie-detail',
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, DatePipe, MatIconModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent {
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  movieService = inject(MovieService);
  location = inject(Location);
  userService = inject(UserService);

  movie = this.route.snapshot.data['movie'] as Movie;
  isFavorite: boolean = false;
  isSeen: boolean = false;

  constructor() {
    effect(_ => {
      if(this.userService.userFavorites()){
        this.isFavorite = this.userService.isFavorite(this.movie.id);
      }

      if(this.userService.userSeenMovies()){
        this.isSeen = this.userService.isSeen(this.movie.id);
      }
    })
  }

  openTrailer() {
    this.movieService.getTrailer(this.movie.id).subscribe((res: any) => {
      const trailer = res.results.find((v: any) => v.type === 'Trailer');

      if (!trailer) return;

      this.dialog.open(TrailerDialog, {
        data: `https://www.youtube.com/embed/${trailer.key}`,
      });
    });
  }

  goBack() {
    this.location.back();
  }
}

@Component({
  template: `<iframe width="100%" height="420" [src]="safeUrl" frameborder="0" allowfullscreen>
  </iframe>`,
})
export class TrailerDialog {
  sanitizer = inject(DomSanitizer);

  safeUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public url: string) {
    // Angular richiede sanitizzazione iframe
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
