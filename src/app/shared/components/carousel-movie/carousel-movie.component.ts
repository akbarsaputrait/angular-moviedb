import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as FavoritesActions from '@ct/favorites/favorites.actions';
import { FavoritesEntity } from '@ct/favorites/favorites.models';
import {
  lucideBookmarkPlus,
  lucideBookMinus,
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
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookMinus }),
  ],
})
export class CarouselMovieComponent {
  private readonly store = inject(Store);

  movies = input.required<IMovie[]>();

  carouselOptions: EmblaOptionsType = {
    loop: true,
    containScroll: false,
  };
  carouselPlugins: EmblaPluginType[] = [
    Autoplay({ playOnInit: true, delay: 7000 }),
  ];

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
