import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmCarouselModule } from '@spartan-ng/ui-carousel-helm';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    // Modules
    CommonModule,
    HlmCarouselModule,

    // Directives
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  items = Array.from({ length: 5 }, (_, i) => i + 1);
  carouselOptions: EmblaOptionsType = {
    loop: true,
  };

  carouselPlugins: EmblaPluginType[] = [
    Autoplay({ playOnInit: true, delay: 7000 }),
  ];
}
