import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Movie } from '../../core/models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButtonModule], 
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Output() watchList = new EventEmitter<void>();

  addToWatchlist(): void {
    this.watchList.emit();
  }
}