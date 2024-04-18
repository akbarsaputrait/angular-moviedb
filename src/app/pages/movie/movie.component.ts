import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideBookmarkPlus,
  lucideBookMinus,
  lucideStar,
} from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmCarouselModule } from '@spartan-ng/ui-carousel-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import {
  HlmH2Directive,
  HlmH3Directive,
  HlmPDirective,
} from '@spartan-ng/ui-typography-helm';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay';
import { delay } from 'rxjs';
import * as FavoritesActions from '../../core/states/favorites/favorites.actions';
import { FavoritesEntity } from '../../core/states/favorites/favorites.models';
import { selectAllFavoriteIds } from '../../core/states/favorites/favorites.selectors';
import { IGenre, IMovie, MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  imports: [
    // Modules
    CommonModule,
    RouterModule,
    HlmCarouselModule,

    // Components
    HlmIconComponent,
    HlmSkeletonComponent,

    // Directives
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmH2Directive,
    HlmH3Directive,
    HlmPDirective,
    HlmBadgeDirective,

    // Pipes
    AsyncPipe,
  ],
  providers: [
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookMinus }),
  ],
})
export class MovieComponent implements OnInit {
  private readonly service = inject(MovieService);
  private readonly store = inject(Store);

  favoriteIds: number[] = [];

  genres: IGenre[] = [];
  discovers: IMovie[] = [];
  nowPlayings: IMovie[] = [];
  upcomings: IMovie[] = [];

  loading = {
    nowPlayings: true,
    upcomings: true,
  };

  carouselOptions: EmblaOptionsType = {
    loop: true,
    containScroll: false,
  };
  carouselPlugins: EmblaPluginType[] = [
    Autoplay({ playOnInit: true, delay: 7000 }),
  ];

  constructor() {
    this.store.select(selectAllFavoriteIds).subscribe((val) => {
      this.favoriteIds = val;
    });
  }

  ngOnInit(): void {
    this.service.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });

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

  addToFavorite(movie: IMovie) {
    const createFavoritesEntity = (movie: IMovie): FavoritesEntity => ({
      id: movie.id,
      type: 'movie',
      created_at: new Date().getTime().toString(),
    });

    const action = FavoritesActions.addFavorite({
      favorite: createFavoritesEntity(movie),
    });

    movie.favorited = true;

    this.store.dispatch(action);
  }

  removeFromFavorite(movie: IMovie) {
    const action = FavoritesActions.removeFavorite({
      id: movie.id,
    });

    movie.favorited = false;

    this.store.dispatch(action);
  }
}
