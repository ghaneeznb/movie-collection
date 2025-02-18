import { Route } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const MOVIE_ROUTES: Route[] = [
  { path: '', component: MovieListComponent },
  { path: ':id', component: MovieDetailComponent },
];
