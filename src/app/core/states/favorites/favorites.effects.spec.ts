import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FavoritesActions from './favorites.actions';
import { FavoritesEffects } from './favorites.effects';

describe('FavoritesEffects', () => {
  let actions: Observable<Action>;
  let effects: FavoritesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FavoritesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FavoritesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FavoritesActions.initFavorites() });

      const expected = hot('-a-|', {
        a: FavoritesActions.loadFavoritesSuccess({ favorites: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
