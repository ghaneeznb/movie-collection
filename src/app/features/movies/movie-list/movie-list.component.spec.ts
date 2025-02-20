import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../../core/services/movie.service';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { addMovie, removeMovie } from '../../../store/watchlist/watchlist.acrion';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let store: MockStore;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockMovies = [
    { imdbID: '1', Title: 'Movie 1', Year: '2020', Type: 'movie', Poster: 'url1' },
    { imdbID: '2', Title: 'Movie 2', Year: '2021', Type: 'movie', Poster: 'url2' }
  ];

  beforeEach(async () => {
    movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), HttpClientTestingModule],
      declarations: [MovieListComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectWatchlistMovies, value: [] }],
        }),
        { provide: MovieService, useValue: movieService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies', () => {
    movieService.getMovies.and.returnValue(of({ Search: mockMovies }));
    component.query = 'Marvel';
    component.fetchMovies();
    expect(component.movies.length).toBe(2);
  });

  it('should add a movie to the watchlist', () => {
    spyOn(store, 'dispatch');
    const movie = mockMovies[0];
    component.addToWatchlist(movie);
    expect(store.dispatch).toHaveBeenCalledWith(addMovie({ movie }));
  });

  it('should remove a movie from the watchlist', () => {
    spyOn(store, 'dispatch');
    component.removeFromWatchlist('1');
    expect(store.dispatch).toHaveBeenCalledWith(removeMovie({ imdbID: '1' }));
  });
});
