import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GenresActions from './genres.actions';
import { GenresEntity } from './genres.models';

export const GENRES_FEATURE_KEY = 'genres';

export interface GenresState extends EntityState<GenresEntity> {
  selectedId?: string | number; // which Genres record has been selected
  loaded: boolean; // has the Genres list been loaded
  error?: string | null; // last known error (if any)
}

export interface GenresPartialState {
  readonly [GENRES_FEATURE_KEY]: GenresState;
}

export const genresAdapter: EntityAdapter<GenresEntity> =
  createEntityAdapter<GenresEntity>();

export const initialGenresState: GenresState = genresAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialGenresState,
  on(GenresActions.initGenres, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GenresActions.loadGenresSuccess, (state, { genres }) =>
    genresAdapter.setAll(genres, { ...state, loaded: true })
  ),
  on(GenresActions.loadGenresFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function genresReducer(state: GenresState | undefined, action: Action) {
  return reducer(state, action);
}
