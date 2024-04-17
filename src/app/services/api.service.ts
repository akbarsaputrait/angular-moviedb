import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface IResponse<T> {
  dates?: {
    maximum: string;
    minimum: string;
  };
  total_pages?: number;
  page: number;
  results: T[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  protected readonly http = inject(HttpClient);
  protected readonly headers: HttpHeaders = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWNiMWYzNGQ1YmY2YWY0NzlhZDA5NzRhYzc0Mzk1NSIsInN1YiI6IjVlZWFmMjk0YjA0NjA1MDAzNDA4ZDFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TcDKyuCFACcTp6oxUxfvmr0LCdzMZOaNv6_yZJU-A0o`,
  });
  protected readonly baseUrl = 'https://api.themoviedb.org/3';
}
