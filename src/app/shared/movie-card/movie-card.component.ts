import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Movie } from '../../core/models/movie.model';
import { RemoveAfterColonPipe } from "../../core/pipes/remove-after-colon.pipe";
import { Store } from '@ngrx/store';
import { addMovie, removeMovie } from '../../store/watchlist/watchlist.acrion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButtonModule, RemoveAfterColonPipe], 
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