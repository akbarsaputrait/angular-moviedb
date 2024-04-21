import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideBookmarkMinus,
  lucideBookmarkPlus,
  lucideStar,
} from '@ng-icons/lucide';
import { CardMovieSkeletonComponent } from '@sc/card-movie-skeleton/card-movie-skeleton.component';
import { CardMovieComponent } from '@sc/card-movie/card-movie.component';
import { HlmBadgeDirective } from '@sc/ui/ui-badge-helm/src';
import { HlmButtonDirective } from '@sc/ui/ui-button-helm/src';
import { HlmIconComponent } from '@sc/ui/ui-icon-helm/src';
import { HlmPDirective } from '@sc/ui/ui-typography-helm/src';
import { delay } from 'rxjs';
import { ICast, IGenre, IMovie, MovieService } from '../movie.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    HlmBadgeDirective,
    HlmPDirective,
    HlmIconComponent,
    HlmButtonDirective,
    CardMovieSkeletonComponent,
    CardMovieComponent,
  ],
  providers: [
    provideIcons({ lucideStar, lucideBookmarkPlus, lucideBookmarkMinus }),
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MovieService);

  movieId: InputSignal<string> = input.required<string>();
  movie: IMovie | undefined;

  casts: ICast[] = [];

  genres: IGenre[] = [];
  similar: IMovie[] = [];

  loading = {
    similar: true,
  };

  constructor() {
    this.service.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });

    effect(() => {
      this.service
        .getMovie(this.movieId.toString())
        .pipe(delay(1000))
        .subscribe((movie) => {
          this.movie = movie;
        });

      this.service
        .getMovieCredits(this.movieId.toString())
        .pipe(delay(1000))
        .subscribe((val) => {
          this.casts = val.cast.slice(0, 8);
        });

      this.service
        .getSimilar(this.movieId.toString())
        .pipe(delay(1000))
        .subscribe((val) => {
          this.similar = val.results.slice(0, 4).map((val) => {
            val.genres = this.genres.filter((genre) =>
              val.genre_ids.includes(genre.id)
            );
            // val.favorited = this.favoriteIds.includes(val.id);

            return val;
          });

          this.loading.similar = false;
        });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['movie_id'];
    });
  }

  addToFavorite(movie: IMovie) {
    return movie;
  }

  removeFromFavorite(movie: IMovie) {
    return movie;
  }
}
