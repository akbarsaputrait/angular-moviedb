import { inject, Injectable } from '@angular/core';
import { ApiService, IResponse } from '@cs/api.service';
import * as FavoritesActions from '@ct/favorites/favorites.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: IGenre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  favorited: boolean;
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService extends ApiService {
  private readonly store = inject(Store);

  getGenres(): Observable<{ genres: IGenre[] }> {
    return this.http.get<{ genres: IGenre[] }>(
      `${this.baseUrl}/genre/movie/list`,
      {
        headers: this.headers,
      }
    );
  }

  getNowPlayings(): Observable<{ results: IMovie[] }> {
    return this.http.get<IResponse<IMovie>>(
      `${this.baseUrl}/movie/now_playing`,
      {
        headers: this.headers,
      }
    );
  }

  getUpcomings(): Observable<{ results: IMovie[] }> {
    return this.http.get<IResponse<IMovie>>(`${this.baseUrl}/movie/upcoming`, {
      headers: this.headers,
    });
  }

  getDiscovers(): Observable<{ results: IMovie[] }> {
    return this.http.get<IResponse<IMovie>>(`${this.baseUrl}/discover/movie`, {
      headers: this.headers,
      params: {
        page: Math.floor(Math.random() * (500 - 1 + 1)) + 1, // Pages start at 1 and max at 500
        include_adult: false,
      },
    });
  }

  getMovie(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(`${this.baseUrl}/movie/${id}`, {
      headers: this.headers,
    });
  }

  getMovieCredits(id: string): Observable<{ id: number; cast: ICast[] }> {
    return this.http.get<{ id: number; cast: ICast[] }>(
      `${this.baseUrl}/movie/${id}/credits`,
      {
        headers: this.headers,
      }
    );
  }

  getSimilar(id: string): Observable<{ results: IMovie[] }> {
    return this.http.get<IResponse<IMovie>>(
      `${this.baseUrl}/movie/${id}/similar`,
      {
        headers: this.headers,
      }
    );
  }

  addToFavorite(movie: IMovie) {
    const action = FavoritesActions.addFavorite({
      favorite: movie,
    });

    // movie.favorited = true;

    this.store.dispatch(action);
  }

  removeFromFavorite(movie: IMovie) {
    const action = FavoritesActions.removeFavorite({
      id: movie.id,
    });

    // movie.favorited = false;

    this.store.dispatch(action);
  }
}
