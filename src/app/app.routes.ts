import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Observable, forkJoin } from 'rxjs';
import { MovieService } from './core/services/movie.service';
import { MovieResolve } from './shared/types/types';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const movieResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieResolve> => {
    const movieService = inject(MovieService);
    return forkJoin({info: movieService.getMovieInfo(route.params['id']), trailer: movieService.getMovieTrailer(route.params['id'])}); 
};

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "movie/:id",
        component: MovieInfoComponent,
        resolve: {movieInfo: movieResolver}
      },
      {
        path: "**",
        component: NotFoundComponent
      }
];
