import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { selectAllFavorites } from '@ct/favorites/favorites.selectors';
import { Store } from '@ngrx/store';
import { IMovie } from '@pg/movie/movie.service';
import { CardMovieComponent } from '@sc/card-movie/card-movie.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CardMovieComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent {
  private readonly store = inject(Store);
  private readonly title = inject(Title);

  favorites$: Observable<IMovie[]> = this.store.select(selectAllFavorites);

  constructor() {
    this.title.setTitle('Favorites - Angular Moviedb');
  }
}
