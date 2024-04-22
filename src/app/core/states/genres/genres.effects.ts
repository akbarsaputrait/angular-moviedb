import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import * as GenresActions from './genres.actions';

@Injectable()
export class GenresEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.initGenres),
      switchMap(() => of(GenresActions.loadGenresSuccess({ genres: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(GenresActions.loadGenresFailure({ error }));
      })
    )
  );
}
