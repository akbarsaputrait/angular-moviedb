import { Route } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  { path: '', component: MoviesComponent },
  { path: 'tv-shows', component: NxWelcomeComponent },
];
