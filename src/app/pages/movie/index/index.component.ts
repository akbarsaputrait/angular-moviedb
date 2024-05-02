import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { selectAllFavoriteIds } from '@ct/favorites/favorites.selectors';
import { selectAllGenres } from '@ct/genres/genres.selectors';
import { Store } from '@ngrx/store';
import { CardMovieSkeletonComponent } from '@sc/card-movie-skeleton/card-movie-skeleton.component';
import { CardMovieComponent } from '@sc/card-movie/card-movie.component';
import { CarouselMovieComponent } from '@sc/carousel-movie/carousel-movie.component';
import { HlmSkeletonComponent } from '@sc/ui/ui-skeleton-helm/src';
import { Subject, takeUntil } from 'rxjs';
import { IGenre, IMovie, MovieService } from '../movie.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,

    // Components
    CardMovieComponent,
    CardMovieSkeletonComponent,
    CarouselMovieComponent,
    HlmSkeletonComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class MovieIndexComponent implements OnInit {
  private readonly service = inject(MovieService);
  private readonly store = inject(Store);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  destroyRef = inject(DestroyRef);

  siteTitle = 'Movies - Angular Moviedb';

  favoriteIds: WritableSignal<number[]> = signal([]);

  nowPlayings: WritableSignal<IMovie[]> = signal([]);
  upcomings: WritableSignal<IMovie[]> = signal([]);
  discovers: WritableSignal<IMovie[]> = signal([]);

  limit = 8;

  genres: IGenre[] = [];

  loading = {
    discovers: true,
    nowPlayings: true,
    upcomings: true,
  };

  constructor() {
    this.store
      .select(selectAllFavoriteIds)
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.favoriteIds.set(val);
      });

    this.store
      .select(selectAllGenres)
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.genres = val;
      });
  }

  ngOnInit(): void {
    const destroyed = new Subject();

    this.title.setTitle(this.siteTitle);
    this.meta.updateTag({ name: 'title', content: this.siteTitle });

    this.service
      .getDiscovers()
      .pipe(takeUntil(destroyed))
      .subscribe((data) => {
        this.discovers.set(
          data.results.slice(0, this.limit).map((val) => {
            val.genres = this.genres.filter((genre) =>
              val.genre_ids.includes(genre.id)
            );
            val.favorited = this.favoriteIds().includes(val.id);

            return val;
          })
        );

        this.loading.discovers = false;
      });

    this.service
      .getNowPlayings()
      .pipe(takeUntil(destroyed))
      .subscribe((data) => {
        this.nowPlayings.set(
          data.results.slice(0, this.limit).map((val) => {
            val.genres = this.genres.filter((genre) =>
              val.genre_ids.includes(genre.id)
            );

            val.favorited = this.favoriteIds().includes(val.id);

            return val;
          })
        );

        this.loading.nowPlayings = false;
      });

    this.service
      .getUpcomings()
      .pipe(takeUntil(destroyed))
      .subscribe((data) => {
        this.upcomings.set(
          data.results.slice(0, this.limit).map((val) => {
            val.genres = this.genres.filter((genre) =>
              val.genre_ids.includes(genre.id)
            );
            val.favorited = this.favoriteIds().includes(val.id);

            return val;
          })
        );

        this.loading.upcomings = false;
      });

    this.destroyRef.onDestroy(() => {
      destroyed.next(null);
      destroyed.complete();
    });
  }
}
