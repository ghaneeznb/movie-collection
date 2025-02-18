import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie.service';
import { addMovie } from '../../../store/watchlist/watchlist.acrion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RemoveAfterColonPipe } from "../../../core/pipes/remove-after-colon.pipe";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  imports: [
    NgIf,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RemoveAfterColonPipe
]
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  loading = false;

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

  addToWatchlist(): void {
    if (this.movie) {
      this.store.dispatch(addMovie({ movie: this.movie }));
    }
  }
}
