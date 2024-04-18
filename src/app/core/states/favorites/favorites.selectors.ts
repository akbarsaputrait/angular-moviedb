import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FAVORITES_FEATURE_KEY,
  FavoritesState,
  favoritesAdapter,
} from './favorites.reducer';

// Lookup the 'Favorites' feature state managed by NgRx
export const selectFavoritesState = createFeatureSelector<FavoritesState>(
  FAVORITES_FEATURE_KEY
);

const { selectAll, selectEntities, selectIds } =
  favoritesAdapter.getSelectors();

export const selectFavoritesLoaded = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.loaded
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.error
);

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => selectAll(state)
);

export const selectAllFavoriteIds = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => selectIds(state) as number[]
);

export const selectFavoritesEntities = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.selectedId
);

export const selectEntity = createSelector(
  selectFavoritesEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
