import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmSkeletonComponent } from '@sc/ui/ui-skeleton-helm/src';

@Component({
  selector: 'app-card-movie-skeleton',
  standalone: true,
  imports: [CommonModule, HlmSkeletonComponent],
  templateUrl: './card-movie-skeleton.component.html',
  styleUrl: './card-movie-skeleton.component.css',
})
export class CardMovieSkeletonComponent {}
