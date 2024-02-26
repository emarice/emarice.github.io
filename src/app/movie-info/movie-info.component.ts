import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieResolve, VideoInfo, VideoResult } from '../shared/types/types';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent {
  movie!: Movie
  trailers: VideoInfo[] = []
  trailerUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { 
    this.route.data.subscribe((result)=>{
      if(result){
        let resolvedMovie: MovieResolve = result['movieInfo'];
        console.log(resolvedMovie.trailer)
        this.movie = resolvedMovie.info;
        //sostituire con find
        this.trailers = resolvedMovie.trailer.results.filter(video => { return video.site == "YouTube" && video.type == "Trailer" && video.official == true && !video.name.toLowerCase().includes("teaser")})
        //
        if(this.trailers.length){
          console.log(this.trailerUrl);
          this.trailerUrl = this.trailers[0].key
        }
      }
    })
  }

  ngOnInit(): void {
  }

  openTrailer(){
    this.dialog.open(TrailerDialog, {
      data: {
        trailerUrl: this.trailerUrl
      }
    })
  }
}

@Component({
  selector: 'trailer-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
  @if(trailerUrl){
    <iframe width="560" height="315" [src]="trailerUrl" frameborder="0" allowfullscreen></iframe>
  }
  `
})
export class TrailerDialog implements OnInit {

  trailerUrl!: SafeResourceUrl;

  constructor(public dialogRef: MatDialogRef<TrailerDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private _sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.trailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.data.trailerUrl}`)
  }
}