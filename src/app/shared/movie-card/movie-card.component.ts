import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../core/models/movie.model';
import { RemoveAfterColonPipe } from "../../core/pipes/remove-after-colon.pipe";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterModule, CommonModule, RemoveAfterColonPipe], 
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() watchlist = false;
  @Output() remove = new EventEmitter<string>();

  removeMovie() {
    this.remove.emit(this.movie.imdbID);
  }
  
}