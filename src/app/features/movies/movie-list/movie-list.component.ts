import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../../core/services/movie.service';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  styleUrls: ['./movie-list.component.scss'],
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule,
    MovieCardComponent
  ],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  loading = false;
  query = 'Marvel';
  errorMessage = '';

  constructor(private movieService: MovieService) {}

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