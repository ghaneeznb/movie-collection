import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Movie } from '../../../core/models/movie.model';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { removeMovie } from '../../../store/watchlist/watchlist.acrion';
import { of } from 'rxjs';
import { MovieCardComponent } from "../../../shared/movie-card/movie-card.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let store: MockStore;

  const mockMovies: Movie[] = [
    { imdbID: 'tt1234567', Title: 'Iron Man', Year: '2008', Poster: 'ironman.jpg', Plot: 'A billionaire becomes Iron Man.', Ratings: [], Type: 'movie' },
    { imdbID: 'tt2345678', Title: 'Thor', Year: '2011', Poster: 'thor.jpg', Plot: 'The God of Thunder.', Ratings: [], Type: 'movie' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent, NgIf, AsyncPipe, NgFor],
      declarations: [WatchlistComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectWatchlistMovies, value: mockMovies }
          ]
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select movies from store on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.moviesInWatchlist.length).toBe(2);
    expect(component.moviesInWatchlist).toEqual(mockMovies);
  });

  it('should remove a movie from the watchlist', () => {
    spyOn(store, 'dispatch');

    const imdbID = 'tt1234567';
    component.removeMovie(imdbID);

    expect(store.dispatch).toHaveBeenCalledWith(removeMovie({ imdbID }));
  });
});
