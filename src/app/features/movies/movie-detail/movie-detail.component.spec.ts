import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../core/models/movie.model';
import { addMovie } from '../../../store/watchlist/watchlist.acrion';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieService: MovieService;
  let store: Store;

  const mockMovie: Movie = {
    imdbID: 'tt1234567',
    Title: 'Test Movie',
    Year: '2023',
    Genre: 'Action',
    Poster: 'https://example.com/poster.jpg',
    Plot: 'A test movie plot',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'tt1234567' } } } },
        provideMockStore(),
        MovieService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    store = TestBed.inject(Store);

    spyOn(movieService, 'getMovieDetails').and.returnValue(of(mockMovie));
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(movieService.getMovieDetails).toHaveBeenCalledWith('tt1234567');
    expect(component.movie).toEqual(mockMovie);
  });

  it('should dispatch addMovie action when adding to watchlist', () => {
    component.movie = mockMovie;
    component.addToWatchlist();

    expect(store.dispatch).toHaveBeenCalledWith(addMovie({ movie: mockMovie }));
  });
});
