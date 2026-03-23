import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../types';

@Injectable({ providedIn: 'root' })
export class MovieService {
  movies = signal<any[]>([]);

  private api = 'https://api.themoviedb.org/3';
  private key = 'ac33b3271c2b40beab187c3a15681d30';

  constructor(private http: HttpClient) {}

  loadPopular() {
    this.http
      .get<any>(`${this.api}/movie/popular?api_key=${this.key}`)
      .subscribe((res) => this.movies.set(res.results));
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.api}/movie/${id}?api_key=${this.key}&append_to_response=credits`);
  }

  getTrailer(id: number) {
    return this.http.get(`${this.api}/movie/${id}/videos?api_key=${this.key}`);
  }
}
