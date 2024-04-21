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
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.scss',
  imports: [
    CommonModule,
    RouterModule,

    // Components
    HlmIconComponent,

    // Directives
    HlmBadgeDirective,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  providers: [
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookMinus }),
  ],
})
export class CardMovieComponent {
  private readonly store = inject(Store);

  movie = input.required<IMovie>();

  addToFavorite() {
    const createFavoritesEntity = (movie: IMovie): FavoritesEntity => ({
      id: movie.id,
      type: 'movie',
      created_at: new Date().getTime().toString(),
    });

    const action = FavoritesActions.addFavorite({
      favorite: createFavoritesEntity(this.movie()),
    });

    this.movie().favorited = true;

    this.store.dispatch(action);
  }

  removeFromFavorite() {
    const action = FavoritesActions.removeFavorite({
      id: this.movie().id,
    });

    this.movie().favorited = false;

    this.store.dispatch(action);
  }
}
