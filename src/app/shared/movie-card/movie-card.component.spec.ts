import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../core/models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: Movie = {
    imdbID: '1',
    Title: 'Test Movie',
    Year: '2022',
    Type: 'movie',
    Poster: 'test-url'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule],
      declarations: [MovieCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToWatchlist when the movie is not in the watchlist', () => {
    spyOn(component.addToWatchlist, 'emit');
    component.isInWatchlist = false;
    component.handleWatchlistAction();
    expect(component.addToWatchlist.emit).toHaveBeenCalledWith(mockMovie);
  });

  it('should emit removeFromWatchlist when the movie is in the watchlist', () => {
    spyOn(component.removeFromWatchlist, 'emit');
    component.isInWatchlist = true;
    component.handleWatchlistAction();
    expect(component.removeFromWatchlist.emit).toHaveBeenCalledWith(mockMovie.imdbID);
  });
});
