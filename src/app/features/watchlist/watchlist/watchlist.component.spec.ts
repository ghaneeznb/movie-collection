import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { addMovie, removeMovie } from '../../../store/watchlist/watchlist.acrion';
import { Movie } from '../../../core/models/movie.model';
import { of } from 'rxjs';
import { MovieCardComponent } from "../../../shared/movie-card/movie-card.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let store: MockStore;

  const mockMovie: Movie = {
    imdbID: '1',
    Title: 'Test Movie',
    Year: '2022',
    Type: 'movie',
    Poster: 'test-url'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), NgIf, NgFor, AsyncPipe],
      declarations: [WatchlistComponent, MovieCardComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectWatchlistMovies, value: [mockMovie] }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    spyOn(store, 'select').and.returnValue(of([mockMovie]));
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies from the store', () => {
    component.watchlist$.subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0]).toEqual(mockMovie);
    });
  });

  it('should dispatch addMovie action when adding a movie', () => {
    component.addToWatchlist(mockMovie);
    expect(store.dispatch).toHaveBeenCalledWith(addMovie({ movie: mockMovie }));
  });

  it('should dispatch removeMovie action when removing a movie', () => {
    component.removeFromWatchlist(mockMovie.imdbID);
    expect(store.dispatch).toHaveBeenCalledWith(removeMovie({ imdbID: mockMovie.imdbID }));
  });

  it('should return true if movie is in watchlist', () => {
    expect(component.isInWatchlist(mockMovie)).toBeTrue();
  });

  it('should return false if movie is not in watchlist', () => {
    const newMovie: Movie = { ...mockMovie, imdbID: '2' };
    expect(component.isInWatchlist(newMovie)).toBeFalse();
  });
});
