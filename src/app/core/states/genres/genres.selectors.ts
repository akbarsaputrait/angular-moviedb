import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GENRES_FEATURE_KEY,
  GenresState,
  genresAdapter,
} from './genres.reducer';

// Lookup the 'Genres' feature state managed by NgRx
export const selectGenresState =
  createFeatureSelector<GenresState>(GENRES_FEATURE_KEY);

const { selectAll, selectEntities } = genresAdapter.getSelectors();

export const selectGenresLoaded = createSelector(
  selectGenresState,
  (state: GenresState) => state.loaded
);

export const selectGenresError = createSelector(
  selectGenresState,
  (state: GenresState) => state.error
);

export const selectAllGenres = createSelector(
  selectGenresState,
  (state: GenresState) => selectAll(state)
);

export const selectGenresEntities = createSelector(
  selectGenresState,
  (state: GenresState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectGenresState,
  (state: GenresState) => state.selectedId
);

export const selectEntity = createSelector(
  selectGenresEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
