import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAllFavoriteIds } from '@ct/favorites/favorites.selectors';
import { selectAllGenres } from '@ct/genres/genres.selectors';
import { provideIcons } from '@ng-icons/core';
import {
  lucideBookmarkMinus,
  lucideBookmarkPlus,
  lucideStar,
} from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { CardMovieSkeletonComponent } from '@sc/card-movie-skeleton/card-movie-skeleton.component';
import { CardMovieComponent } from '@sc/card-movie/card-movie.component';
import { HlmBadgeDirective } from '@sc/ui/ui-badge-helm/src';
import { HlmButtonDirective } from '@sc/ui/ui-button-helm/src';
import { HlmIconComponent } from '@sc/ui/ui-icon-helm/src';
import { HlmPDirective } from '@sc/ui/ui-typography-helm/src';
import { catchError, Subject, takeUntil } from 'rxjs';
import { ICast, IGenre, IMovie, MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,

    AsyncPipe,

    HlmBadgeDirective,
    HlmPDirective,
    HlmButtonDirective,

    HlmIconComponent,
    CardMovieSkeletonComponent,
    CardMovieComponent,
  ],
  providers: [
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookmarkMinus }),
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(MovieService);
  private readonly store = inject(Store);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  destroyRef = inject(DestroyRef);

  movieId: WritableSignal<string> = signal<string>('');

  _movie: IMovie | null = null;
  @Input()
  get movie() {
    return this._movie;
  }

  set movie(val: IMovie | null) {
    if (val === null) {
      this._movie = null;
    } else if (val !== this.movie) {
      this._movie = Object.assign({}, val);
    }
  }

  casts: ICast[] = [];

  genres: IGenre[] = [];
  similar: IMovie[] = [];

  favoriteIds: number[] = [];

  loading = {
    similar: true,
  };

  constructor() {
    this.store
      .select(selectAllGenres)
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.genres = val;
      });

    this.store
      .select(selectAllFavoriteIds)
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.favoriteIds = val;
      });

    const destroyed = new Subject<void>();

    effect(() => {
      this.service
        .getMovie(this.movieId())
        .pipe(
          takeUntil(destroyed),
          catchError((err) => {
            this.catchError(err);
            throw err;
          })
        )
        .subscribe((movie) => {
          this.movie = movie;
          this.title.setTitle(`${this.movie.title} - Angular Moviedb`);

          if (this.movie.poster_path) {
            this.meta.updateTag({
              name: 'og:image',
              content: `https://image.tmdb.org/t/p/original${this.movie.poster_path}`,
            });
          }

          if (this.favoriteIds.includes(Number(movie.id))) {
            this.movie.favorited = true;
          }
        });

      this.service
        .getMovieCredits(this.movieId())
        .pipe(
          takeUntil(destroyed),
          catchError((err) => {
            throw err;
          })
        )
        .subscribe((val) => {
          this.casts = val.cast.slice(0, 8);
        });

      this.service
        .getSimilar(this.movieId())
        .pipe(
          takeUntil(destroyed),
          catchError((err) => {
            throw err;
          })
        )
        .subscribe((val) => {
          this.similar = val.results.slice(0, 4).map((val) => {
            val.genres = this.genres.filter((genre) =>
              val.genre_ids.includes(genre.id)
            );
            val.favorited = this.favoriteIds.includes(val.id);

            return val;
          });

          this.loading.similar = false;
        });
    });

    this.destroyRef.onDestroy(() => {
      destroyed.next();
      destroyed.complete();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId.set(params['movie_id']);
      this.movie = null;
      this.similar = [];
      this.casts = [];
    });
  }

  addToFavorite() {
    if (this.movie) {
      this.movie = Object.assign({}, { ...this.movie, favorited: true });
      this.service.addToFavorite(this.movie);
    }
  }

  removeFromFavorite() {
    if (this.movie) {
      this.movie = Object.assign({}, { ...this.movie, favorited: false });
      this.service.removeFromFavorite(this.movie);
    }
  }

  catchError(err: HttpErrorResponse) {
    if (err.status === 404) {
      this.router.navigate(['/not-found']);
    }
  }
}
