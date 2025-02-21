import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { MovieService } from '../../../core/services/movie.service';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { addMovie, removeMovie } from '../../../store/watchlist/watchlist.acrion';
import { Movie } from '../../../core/models/movie.model';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let store: MockStore;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockMovie: Movie = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    Year: '2022',
    Poster: 'test-poster.jpg',
    Plot: 'Test plot',
    Ratings: [{ Source: 'IMDB', Value: '8/10' }],
    Type: 'movie'
  };

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovieDetails']);

    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [MovieDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'tt1234567' } } }
        },
        { provide: MovieService, useValue: movieServiceSpy },
        provideMockStore({ selectors: [{ selector: selectWatchlistMovies, value: [] }] })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    movieService.getMovieDetails.and.returnValue(of(mockMovie));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init', () => {
    expect(component.movie).toEqual(mockMovie);
    expect(component.loading).toBeFalse();
  });

  it('should check watchlist and update isInWatchlist correctly', () => {
    store.overrideSelector(selectWatchlistMovies, [mockMovie]);
    store.refreshState();
    fixture.detectChanges();

    expect(component.isInWatchlist).toBeTrue();
  });

  it('should dispatch addMovie action when adding to watchlist', () => {
    spyOn(store, 'dispatch');

    component.movie = mockMovie;
    component.addToWatchlist();

    expect(store.dispatch).toHaveBeenCalledWith(addMovie({ movie: mockMovie }));
  });

  it('should dispatch removeMovie action when removing from watchlist', () => {
    spyOn(store, 'dispatch');

    component.removeFromWatchlist(mockMovie.imdbID);

    expect(store.dispatch).toHaveBeenCalledWith(removeMovie({ imdbID: mockMovie.imdbID }));
  });

  it('should call removeFromWatchlist if the movie is in the watchlist', () => {
    spyOn(component, 'removeFromWatchlist');

    component.isInWatchlist = true;
    component.handleWatchlistAction();

    expect(component.removeFromWatchlist).toHaveBeenCalledWith('tt1234567');
  });

  it('should call addToWatchlist if the movie is not in the watchlist', () => {
    spyOn(component, 'addToWatchlist');

    component.isInWatchlist = false;
    component.handleWatchlistAction();

    expect(component.addToWatchlist).toHaveBeenCalled();
  });
});
