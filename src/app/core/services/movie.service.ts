import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiscoverResponse, Movie, VideoResult, GenresResult } from '../../shared/types/types';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private base: HttpBaseService) { }

  popularThisYear(){
    return this.http.get<DiscoverResponse>(this.base.buildApiRequest("discover/movie", "&sort_by=popularity.desc&include_adult=false"))
  }

  getMovieInfo(movieId: number){
    return this.http.get<Movie>(this.base.buildApiRequest(`movie/${movieId}`))
  }

  getMovieTrailer(movieId: number){
    return this.http.get<VideoResult>(this.base.buildApiRequest(`movie/${movieId}/videos`))
  }

  getGenres(){
    return this.http.get<GenresResult>(this.base.buildApiRequest(`genre/movie/list`))
  }
}
