import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../../core/models/movie.model';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { addMovie, removeMovie } from '../../../store/watchlist/watchlist.acrion';
import { MovieCardComponent } from "../../../shared/movie-card/movie-card.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-watchlist',
  standalone: true,
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  imports: [MovieCardComponent, NgIf, AsyncPipe, NgFor]
})
export class WatchlistComponent implements OnInit {
  watchlist$!: Observable<Movie[]>;
  moviesInWatchlist: Movie[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.watchlist$ = this.store.select(selectWatchlistMovies);
    this.watchlist$.subscribe((movies: Movie[]) => {
      this.moviesInWatchlist = movies;
    });
  }

  addToWatchlist(movie: Movie): void {
    if (!this.isInWatchlist(movie)) {
      this.store.dispatch(addMovie({ movie }));
    }
  }

  removeFromWatchlist(imdbID: string): void {
    this.store.dispatch(removeMovie({ imdbID }));
  }

  isInWatchlist(movie: Movie): boolean {
    return this.moviesInWatchlist.some(m => m.imdbID === movie.imdbID);
  }
}