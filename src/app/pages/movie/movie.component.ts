import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import * as GenresActions from '@ct/genres/genres.actions';
import { Store } from '@ngrx/store';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  imports: [RouterModule],
})
export class MovieComponent {
  private readonly store = inject(Store);
  private readonly service = inject(MovieService);

  constructor() {
    this.service
      .getGenres()
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.store.dispatch(
          GenresActions.loadGenresSuccess({ genres: val.genres })
        );
      });
  }
}
