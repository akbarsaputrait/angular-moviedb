import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { selectAllFavoriteIds } from '@ct/favorites/favorites.selectors';
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

  favoriteIds: number[] = [];

  genres: IGenre[] = [];
  discovers: IMovie[] = [];
  nowPlayings: IMovie[] = [];
  upcomings: IMovie[] = [];

  loading = {
    discovers: true,
    nowPlayings: true,
    upcomings: true,
  };

  constructor() {
    this.store.select(selectAllFavoriteIds).subscribe((val) => {
      this.favoriteIds = val;
    });

    this.service.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  ngOnInit(): void {
    this.service
      .getDiscovers()
      .pipe(delay(1000))
      .subscribe((data) => {
        this.discovers = data.results.slice(0, 4).map((val) => {
          val.genres = this.genres.filter((genre) =>
            val.genre_ids.includes(genre.id)
          );
          val.favorited = this.favoriteIds.includes(val.id);

          return val;
        });

        this.loading.discovers = false;
      });

    this.service
      .getNowPlayings()
      .pipe(delay(1000))
      .subscribe((data) => {
        console.log(this.favoriteIds);
        this.nowPlayings = data.results.slice(0, 4).map((val) => {
          val.genres = this.genres.filter((genre) =>
            val.genre_ids.includes(genre.id)
          );

          val.favorited = this.favoriteIds.includes(val.id);

          return val;
        });

        this.loading.nowPlayings = false;
      });

    this.service
      .getUpcomings()
      .pipe(delay(1000))
      .subscribe((data) => {
        this.upcomings = data.results.slice(0, 4).map((val) => {
          val.genres = this.genres.filter((genre) =>
            val.genre_ids.includes(genre.id)
          );
          val.favorited = this.favoriteIds.includes(val.id);

          return val;
        });

        this.loading.upcomings = false;
      });
  }
}
