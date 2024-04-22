import { Action } from '@ngrx/store';

import * as GenresActions from './genres.actions';
import { GenresEntity } from './genres.models';
import {
  GenresState,
  initialGenresState,
  genresReducer,
} from './genres.reducer';

describe('Genres Reducer', () => {
  const createGenresEntity = (id: string, name = ''): GenresEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Genres actions', () => {
    it('loadGenresSuccess should return the list of known Genres', () => {
      const genres = [
        createGenresEntity('PRODUCT-AAA'),
        createGenresEntity('PRODUCT-zzz'),
      ];
      const action = GenresActions.loadGenresSuccess({ genres });

      const result: GenresState = genresReducer(initialGenresState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = genresReducer(initialGenresState, action);

      expect(result).toBe(initialGenresState);
    });
  });
});
