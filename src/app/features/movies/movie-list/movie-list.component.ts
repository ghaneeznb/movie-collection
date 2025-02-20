import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../../../core/models/movie.model';
import { addMovie, removeMovie } from '../../../store/watchlist/watchlist.acrion';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { MovieService } from '../../../core/services/movie.service';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [MovieCardComponent, NgIf, FormsModule, NgFor ],
  standalone: true,
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  query: string = 'Marvel';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private store: Store, private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    if (!this.query.trim()) return;

    this.loading = true;
    this.errorMessage = '';
    
    this.movieService.getMovies(this.query).subscribe({
      next: (response) => {
        this.movies = response.Search || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.errorMessage = 'Failed to load movies. Please try again.';
        this.loading = false;
      },
    });
  }
}
