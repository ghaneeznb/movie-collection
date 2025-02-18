import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../models/movie.model';
import { environment } from '../../../environments/envirinment';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const API_KEY = environment.apiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
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

  it('should fetch movies based on search query', () => {
    const mockMovies: Movie[] = [
      {
        imdbID: 'tt1234567',
        Title: 'Test Movie',
        Year: '2023',
        Genre: 'Action',
        Poster: 'https://example.com/poster.jpg',
      },
    ];

    service.getMovies('Test').subscribe((movies: any) => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(`${service.API_URL}?apikey=${API_KEY}&s=Test&type=movie`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should fetch movie details by IMDb ID', () => {
    const mockMovieDetail: Movie = {
      imdbID: 'tt1234567',
      Title: 'Test Movie',
      Year: '2023',
      Genre: 'Action',
      Poster: 'https://example.com/poster.jpg',
      Plot: 'A test movie plot',
      Director: 'Test Director',
      Actors: 'Actor1, Actor2',
      Runtime: '120 min',
      Rated: 'PG-13',
      Released: '2023-01-01',
      Language: 'English',
      Country: 'USA',
      Ratings: [{ Source: 'IMDb', Value: '8.0/10' }],
      Metascore: '75',
      imdbRating: '8.0',
      imdbVotes: '1000',
      Type: 'movie',
    };

    service.getMovieDetails('tt1234567').subscribe((movie) => {
      expect(movie).toEqual(mockMovieDetail);
    });

    const req = httpMock.expectOne(`${service.API_URL}?apikey=${API_KEY}&i=tt1234567&plot=full`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieDetail);
  });
});
