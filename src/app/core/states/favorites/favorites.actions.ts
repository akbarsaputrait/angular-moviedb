import { createAction, props } from '@ngrx/store';
import { FavoritesEntity } from './favorites.models';

export const initFavorites = createAction('[Favorites/API] Init');

export const loadFavoritesSuccess = createAction(
  '[Favorites/API] Load Favorites Success',
  props<{ favorites: FavoritesEntity[] }>()
);

export const loadFavoritesFailure = createAction(
  '[Favorites/API] Load Favorites Failure',
  props<{ error: any }>()
);

export const addFavorite = createAction(
  '[Favorites/API] Add Favorite',
  props<{ favorite: FavoritesEntity }>()
);

export const removeFavorite = createAction(
  '[Favorites/API] Remove Favorite',
  props<{ id: number }>()
);
