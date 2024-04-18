import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as FavoritesActions from './favorites.actions';
import * as FavoritesFeature from './favorites.reducer';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.initFavorites),
      switchMap(() =>
        of(FavoritesActions.loadFavoritesSuccess({ favorites: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(FavoritesActions.loadFavoritesFailure({ error }));
      })
    )
  );
}
