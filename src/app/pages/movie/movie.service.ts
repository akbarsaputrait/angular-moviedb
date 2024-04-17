import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, IResponse } from '../../services/api.service';

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
}

export interface IGenre {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService extends ApiService {
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
}
