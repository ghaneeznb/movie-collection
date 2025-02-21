import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../models/movie.model';
import { environment } from '../../../environments/envirinment';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const API_URL = 'https://www.omdbapi.com/';
  const API_KEY = environment.apiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies based on query', () => {
    const mockResponse = {
      Search: [
        { imdbID: 'tt1234567', Title: 'Iron Man', Year: '2008', Poster: 'ironman.jpg', Type: 'movie' }
      ]
    };

    service.getMovies('Iron Man').subscribe((response) => {
      expect(response.Search.length).toBe(1);
      expect(response.Search[0].Title).toBe('Iron Man');
    });

    const req = httpMock.expectOne(`${API_URL}?apikey=${API_KEY}&s=Iron%20Man`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movie details based on imdbID', () => {
    const mockMovie: Movie = {
      imdbID: 'tt1234567',
      Title: 'Iron Man',
      Year: '2008',
      Poster: 'ironman.jpg',
      Plot: 'A billionaire becomes Iron Man.',
      Ratings: [],
      Type: 'movie'
    };

    service.getMovieDetails('tt1234567').subscribe((movie) => {
      expect(movie.imdbID).toBe('tt1234567');
      expect(movie.Title).toBe('Iron Man');
    });

    const req = httpMock.expectOne(`${API_URL}?apikey=${API_KEY}&i=tt1234567&plot=full`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });
});
