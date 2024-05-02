import { Route } from '@angular/router';
import { FavoriteComponent } from '@pg/favorite/favorite.component';
import { MovieDetailComponent } from '@pg/movie/detail/detail.component';
import { MovieIndexComponent } from '@pg/movie/index/index.component';
import { NotFoundComponent } from '@pg/not-found/not-found.component';
import { MovieComponent } from './pages/movie/movie.component';

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
  { path: 'favorites', component: FavoriteComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
