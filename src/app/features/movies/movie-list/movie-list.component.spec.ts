import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../../core/services/movie.service';
import { of, throwError } from 'rxjs';
import { Movie } from '../../../core/models/movie.model';
import { MovieCardComponent } from '../../../shared/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  const mockMovies: Movie[] = [
    { imdbID: 'tt1234567', Title: 'Iron Man', Year: '2008',  Poster: 'ironman.jpg', Plot: 'A billionaire becomes Iron Man.', Ratings: [], Type: 'movie' },
    { imdbID: 'tt2345678', Title: 'Thor', Year: '2011', Poster: 'thor.jpg', Plot: 'The God of Thunder.', Ratings: [], Type: 'movie' }
  ];

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [MovieCardComponent, FormsModule, NgIf, NgFor],
      declarations: [MovieListComponent],
      providers: [{ provide: MovieService, useValue: movieServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;

    movieService.getMovies.and.returnValue(of({ Search: mockMovies }));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(movieService.getMovies).toHaveBeenCalledWith('Marvel');
    expect(component.movies.length).toBe(2);
    expect(component.movies).toEqual(mockMovies);
    expect(component.loading).toBeFalse();
  });

  it('should not fetch movies if query is empty', () => {
    component.query = ' ';
    component.fetchMovies();

    expect(movieService.getMovies).not.toHaveBeenCalled();
  });

  it('should handle errors when fetching movies', () => {
    movieService.getMovies.and.returnValue(throwError(() => new Error('API Error')));
    
    component.fetchMovies();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Failed to load movies. Please try again.');
    expect(component.loading).toBeFalse();
    expect(component.movies.length).toBe(0);
  });

  it('should set loading to true when fetching movies', () => {
    component.fetchMovies();

    expect(component.loading).toBeTrue();
  });

  it('should update movies list on successful fetch', () => {
    component.fetchMovies();
    fixture.detectChanges();

    expect(component.movies.length).toBe(2);
    expect(component.movies).toEqual(mockMovies);
  });
});
