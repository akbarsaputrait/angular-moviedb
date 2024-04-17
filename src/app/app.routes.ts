import { Route } from '@angular/router';
import { MovieComponent } from './pages/movie/movie.component';
import { TvShowComponent } from './pages/tv-show/tv-show.component';

export const appRoutes: Route[] = [
  { path: '', component: MovieComponent },
  { path: 'tv-shows', component: TvShowComponent },
];
