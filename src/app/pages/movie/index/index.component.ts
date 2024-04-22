import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { selectAllFavoriteIds } from '@ct/favorites/favorites.selectors';
import { selectAllGenres } from '@ct/genres/genres.selectors';
import { Store } from '@ngrx/store';
import { CardMovieSkeletonComponent } from '@sc/card-movie-skeleton/card-movie-skeleton.component';
import { CardMovieComponent } from '@sc/card-movie/card-movie.component';
import { CarouselMovieComponent } from '@sc/carousel-movie/carousel-movie.component';
import { HlmSkeletonComponent } from '@sc/ui/ui-skeleton-helm/src';
import { delay } from 'rxjs';
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
    this.store.select(selectAllFavoriteIds).subscribe((val) => {
      this.favoriteIds.set(val);
    });

    this.store.select(selectAllGenres).subscribe((val) => {
      this.genres = val;
    });
  }

  ngOnInit(): void {
    this.title.setTitle('Movies - Angular Moviedb');

    this.service
      .getDiscovers()
      .pipe(delay(1000))
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
      .pipe(delay(1000))
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
      .pipe(delay(1000))
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
  }
}
