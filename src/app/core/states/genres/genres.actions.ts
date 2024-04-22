import { createAction, props } from '@ngrx/store';
import { GenresEntity } from './genres.models';

export const initGenres = createAction('[Genres Page] Init');

export const loadGenresSuccess = createAction(
  '[Genres/API] Load Genres Success',
  props<{ genres: GenresEntity[] }>()
);

export const loadGenresFailure = createAction(
  '[Genres/API] Load Genres Failure',
  props<{ error: any }>()
);
