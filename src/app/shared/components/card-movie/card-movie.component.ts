import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  lucideBookmarkMinus,
  lucideBookmarkPlus,
  lucideStar,
} from '@ng-icons/lucide';
import { IMovie, MovieService } from '@pg/movie/movie.service';
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
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookmarkMinus }),
  ],
})
export class CardMovieComponent {
  private readonly service = inject(MovieService);

  _movie: IMovie = {} as IMovie;
  @Input()
  get movie() {
    return this._movie;
  }

  set movie(val: IMovie) {
    if (val !== this.movie) {
      this._movie = Object.assign({}, val);
    }
  }

  addToFavorite() {
    this.service.addToFavorite(this.movie);
    this.movie = Object.assign({}, { ...this.movie, favorited: true });
  }

  removeFromFavorite() {
    this.service.removeFromFavorite(this.movie);
    this.movie = Object.assign({}, { ...this.movie, favorited: false });
  }
}
