import { Action } from '@ngrx/store';

import * as FavoritesActions from './favorites.actions';
import { FavoritesEntity } from './favorites.models';
import {
  favoritesReducer,
  FavoritesState,
  initialFavoritesState,
} from './favorites.reducer';

describe('Favorites Reducer', () => {
  const createFavoritesEntity = (
    id: number,
    type: 'movie' | 'tvshow',
    created_at: string
  ): FavoritesEntity => ({
    id,
    type,
    created_at,
  });

  describe('valid Favorites actions', () => {
    it('loadFavoritesSuccess should return the list of known Favorites', () => {
      const favorites = [createFavoritesEntity(0, 'movie', ' ')];
      const action = FavoritesActions.loadFavoritesSuccess({ favorites });

      const result: FavoritesState = favoritesReducer(
        initialFavoritesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = favoritesReducer(initialFavoritesState, action);

      expect(result).toBe(initialFavoritesState);
    });
  });
});
