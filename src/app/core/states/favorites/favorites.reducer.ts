import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as FavoritesActions from './favorites.actions';
import { FavoritesEntity } from './favorites.models';

export const FAVORITES_FEATURE_KEY = 'favorites';

export interface FavoritesState extends EntityState<FavoritesEntity> {
  selectedId?: string | number; // which Favorites record has been selected
  loaded: boolean; // has the Favorites list been loaded
  error?: string | null; // last known error (if any)
}

export interface FavoritesPartialState {
  readonly [FAVORITES_FEATURE_KEY]: FavoritesState;
}

export const favoritesAdapter: EntityAdapter<FavoritesEntity> =
  createEntityAdapter<FavoritesEntity>();

export const initialFavoritesState: FavoritesState =
  favoritesAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialFavoritesState,
  on(FavoritesActions.initFavorites, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) =>
    favoritesAdapter.setAll(favorites, { ...state, loaded: true })
  ),
  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(FavoritesActions.addFavorite, (state, { favorite }) =>
    favoritesAdapter.addOne(favorite, state)
  ),
  on(FavoritesActions.removeFavorite, (state, { id }) =>
    favoritesAdapter.removeOne(id, state)
  )
);

export function favoritesReducer(
  state: FavoritesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
