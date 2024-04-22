import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as FavoritesActions from '@ct/favorites/favorites.actions';
import {
  lucideBookmarkMinus,
  lucideBookmarkPlus,
  lucideStar,
} from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { IMovie } from '@pg/movie/movie.service';
import { HlmBadgeDirective } from '@sc/ui/ui-badge-helm/src';
import { HlmButtonDirective } from '@sc/ui/ui-button-helm/src';
import { HlmCarouselModule } from '@sc/ui/ui-carousel-helm/src';
import { HlmIconComponent, provideIcons } from '@sc/ui/ui-icon-helm/src';
import {
  HlmH2Directive,
  HlmH3Directive,
  HlmPDirective,
} from '@sc/ui/ui-typography-helm/src';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-carousel-movie',
  standalone: true,
  templateUrl: './carousel-movie.component.html',
  styleUrl: './carousel-movie.component.css',
  imports: [
    // Modules
    CommonModule,
    RouterModule,
    HlmCarouselModule,

    // Components
    HlmIconComponent,

    // Directives
    HlmBadgeDirective,
    HlmButtonDirective,
    HlmH2Directive,
    HlmH3Directive,
    HlmPDirective,
  ],
  providers: [
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookmarkMinus }),
  ],
})
export class CarouselMovieComponent {
  private readonly store = inject(Store);

  _movies: IMovie[] = [];
  @Input()
  get movies() {
    return this._movies;
  }

  set movies(val: IMovie[]) {
    if (val !== this.movies) {
      this._movies = cloneDeep(val);
    }
  }

  carouselOptions: EmblaOptionsType = {
    loop: true,
    containScroll: false,
  };
  carouselPlugins: EmblaPluginType[] = [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ];

  addToFavorite(movie: IMovie) {
    const action = FavoritesActions.addFavorite({
      favorite: movie,
    });

    this.movies = this.movies.map((val) => {
      if (val.id === movie.id) {
        val = Object.assign({}, { ...movie, favorited: true });
      }

      return val;
    });

    this.store.dispatch(action);
  }

  removeFromFavorite(movie: IMovie) {
    const action = FavoritesActions.removeFavorite({
      id: movie.id,
    });

    this.movies = this.movies.map((val) => {
      if (val.id === movie.id) {
        val = Object.assign({}, { ...movie, favorited: false });
      }

      return val;
    });

    this.store.dispatch(action);
  }
}
