import { TestBed } from '@angular/core/testing';
import { WatchlistService } from './watchlist.service';
import { Movie } from '../models/movie.model';

describe('WatchlistService', () => {
  let service: WatchlistService;
  const mockMovie: Movie = { imdbID: '1', Title: 'Test Movie', Year: '2025', Genre: 'Action', Poster: 'url', Plot: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistService);
  });

  it('should add a movie to the watchlist', () => {
    service.addMovie(mockMovie);
    service.watchlist$.subscribe((list : Movie) => {
      expect(list).toContain(mockMovie);
    });
  });

  it('should remove a movie from the watchlist', () => {
    service.addMovie(mockMovie);
    service.removeMovie(mockMovie.imdbID);
    service.watchlist$.subscribe((list : Movie) => {
      expect(list).not.toContain(mockMovie);
    });
  });
});
