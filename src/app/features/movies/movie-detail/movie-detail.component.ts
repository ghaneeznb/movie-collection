import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie.service';
import { addMovie, removeMovie } from '../../../store/watchlist/watchlist.acrion';
import { RemoveAfterColonPipe } from "../../../core/pipes/remove-after-colon.pipe";
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  imports: [
    NgIf,
    CommonModule,
    RemoveAfterColonPipe
]
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  loading = false;
  @Input() isInWatchlist = false;
  watchlist$!: Observable<Movie[]>;
  moviesInWatchlist: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const imdbID = this.route.snapshot.paramMap.get('id');
    if (imdbID) {
      this.fetchMovieDetails(imdbID);
    }
    this.checkWatchlist();
  }

  fetchMovieDetails(imdbID: string): void {
    this.loading = true;
    this.movieService.getMovieDetails(imdbID).subscribe({
      next: (data) => {
        this.movie = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  checkWatchlist(){
    this.watchlist$ = this.store.select(selectWatchlistMovies);
    this.watchlist$.subscribe((movies: Movie[]) => {
      this.moviesInWatchlist = movies;
      this.isInWatchlist = movies.some(movie => movie.imdbID === this.movie?.imdbID);
    });
  }

  handleWatchlistAction(): void {
    const imdbID = this.route.snapshot.paramMap.get('id');
    if (this.isInWatchlist && imdbID) {
      this.removeFromWatchlist(imdbID);
    } else {
      this.addToWatchlist() 
    }
  }

  addToWatchlist(): void {
    if (this.movie) {
      this.store.dispatch(addMovie({ movie: this.movie }));
    }
  }
  
  removeFromWatchlist(imdbID: string): void {
    this.store.dispatch(removeMovie({ imdbID }));
  }
}
