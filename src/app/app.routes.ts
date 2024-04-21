import { Route } from '@angular/router';
import { MovieDetailComponent } from '@pg/movie/detail/detail.component';
import { MovieIndexComponent } from '@pg/movie/index/index.component';
import { MovieComponent } from './pages/movie/movie.component';
import { TvShowComponent } from './pages/tv-show/tv-show.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: 'movies',
    component: MovieComponent,
    children: [
      {
        path: '',
        component: MovieIndexComponent,
      },
      {
        path: ':movie_id',
        component: MovieDetailComponent,
      },
    ],
  },
  { path: 'tv-shows', component: TvShowComponent },
];
