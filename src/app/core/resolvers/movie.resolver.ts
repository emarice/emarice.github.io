import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MovieService } from '../services/movie.service';

export const movieResolver: ResolveFn<any> = (route) => {
  return inject(MovieService).getMovie(route.paramMap.get('id')!);
};
