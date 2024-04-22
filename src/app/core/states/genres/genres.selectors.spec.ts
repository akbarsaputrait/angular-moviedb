import { GenresEntity } from './genres.models';
import {
  genresAdapter,
  GenresPartialState,
  initialGenresState,
} from './genres.reducer';
import * as GenresSelectors from './genres.selectors';

describe('Genres Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGenresId = (it: GenresEntity) => it.id;
  const createGenresEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GenresEntity);

  let state: GenresPartialState;

  beforeEach(() => {
    state = {
      genres: genresAdapter.setAll(
        [
          createGenresEntity('PRODUCT-AAA'),
          createGenresEntity('PRODUCT-BBB'),
          createGenresEntity('PRODUCT-CCC'),
        ],
        {
          ...initialGenresState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Genres Selectors', () => {
    it('selectAllGenres() should return the list of Genres', () => {
      const results = GenresSelectors.selectAllGenres(state);
      const selId = getGenresId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = GenresSelectors.selectEntity(state) as GenresEntity;
      const selId = getGenresId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectGenresLoaded() should return the current "loaded" status', () => {
      const result = GenresSelectors.selectGenresLoaded(state);

      expect(result).toBe(true);
    });

    it('selectGenresError() should return the current "error" state', () => {
      const result = GenresSelectors.selectGenresError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
