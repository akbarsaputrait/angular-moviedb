import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideBookmarkPlus, lucideStar } from '@ng-icons/lucide';
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
  providers: [provideIcons({ lucideStar, lucideBookmarkPlus })],
})
export class MovieComponent implements OnInit {
  private readonly service = inject(MovieService);

  genres$ = this.service.getGenres();
  genres: IGenre[] = [];

  discovers$ = this.service.getDiscovers();
  discovers: IMovie[] = [];

  nowPlayings$ = this.service.getNowPlayings();
  nowPlayings: IMovie[] = [];

  upcomings$ = this.service.getUpcomings();
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

  ngOnInit(): void {
    this.genres$.subscribe((data) => {
      this.genres = data.genres;
    });

    this.discovers$.subscribe((data) => {
      this.discovers = data.results.slice(0, 4).map((val) => {
        val.genres = this.genres.filter((genre) =>
          val.genre_ids.includes(genre.id)
        );

        return val;
      });
    });

    this.nowPlayings$.pipe(delay(1000)).subscribe((data) => {
      this.nowPlayings = data.results.slice(0, 4).map((val) => {
        val.genres = this.genres.filter((genre) =>
          val.genre_ids.includes(genre.id)
        );

        return val;
      });
      this.loading.nowPlayings = false;
    });

    this.upcomings$.pipe(delay(1000)).subscribe((data) => {
      this.upcomings = data.results.slice(0, 4).map((val) => {
        val.genres = this.genres.filter((genre) =>
          val.genre_ids.includes(genre.id)
        );

        return val;
      });
      this.loading.upcomings = false;
    });
  }
}
