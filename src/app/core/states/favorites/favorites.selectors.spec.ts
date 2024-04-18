import { FavoritesEntity } from './favorites.models';
import {
  favoritesAdapter,
  FavoritesPartialState,
  initialFavoritesState,
} from './favorites.reducer';
import * as FavoritesSelectors from './favorites.selectors';

describe('Favorites Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFavoritesId = (it: FavoritesEntity) => it.id;
  const createFavoritesEntity = (
    id: number,
    type: 'movie' | 'tvshow',
    created_at = ''
  ) =>
    ({
      id,
      type,
      created_at,
    } as FavoritesEntity);

  let state: FavoritesPartialState;

  beforeEach(() => {
    state = {
      favorites: favoritesAdapter.setAll(
        [createFavoritesEntity(1, 'movie', '')],
        {
          ...initialFavoritesState,
          selectedId: 0,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Favorites Selectors', () => {
    it('selectAllFavorites() should return the list of Favorites', () => {
      const results = FavoritesSelectors.selectAllFavorites(state);
      const selId = getFavoritesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = FavoritesSelectors.selectEntity(state) as FavoritesEntity;
      const selId = getFavoritesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFavoritesLoaded() should return the current "loaded" status', () => {
      const result = FavoritesSelectors.selectFavoritesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectFavoritesError() should return the current "error" state', () => {
      const result = FavoritesSelectors.selectFavoritesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
