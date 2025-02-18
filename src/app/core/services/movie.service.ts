import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from '../../../environments/envirinment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_KEY = environment.apiKey;
  private API_URL = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  getMovies(query: string): Observable<any> {
    return this.http.get(`${this.API_URL}?apikey=${this.API_KEY}&s=${encodeURIComponent(query)}`);
  }

  getMovieDetails(imdbID: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL}?apikey=${this.API_KEY}&i=${imdbID}&plot=full`);
  }
}
