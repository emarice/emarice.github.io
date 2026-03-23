import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { movieResolver } from './core/resolvers/movie.resolver';
import { HomeComponent } from './features/home/home.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    resolve: { movie: movieResolver },
    data: {
      hideToolbar: true,
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
];
