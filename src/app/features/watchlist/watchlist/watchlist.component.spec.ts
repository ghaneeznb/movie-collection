import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Movie } from '../../../core/models/movie.model';
import { selectWatchlistMovies } from '../../../store/watchlist/watchlist.selector';
import { removeMovie } from '../../../store/watchlist/watchlist.acrion';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let store: Store;

  const mockMovies: Movie[] = [
    { imdbID: 'tt1234567', Title: 'Test Movie 1', Year: '2023', Genre: 'Action', Poster: 'https://example.com/poster1.jpg' },
    { imdbID: 'tt7654321', Title: 'Test Movie 2', Year: '2022', Genre: 'Comedy', Poster: 'https://example.com/poster2.jpg' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectWatchlistMovies, value: mockMovies }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch watchlist movies from store', () => {
    fixture.detectChanges();
    component.watchlist$.subscribe((movies) => {
      expect(movies).toEqual(mockMovies);
    });
  });

  it('should dispatch removeMovie action when removing from watchlist', () => {
    component.removeFromWatchlist('tt1234567');

    expect(store.dispatch).toHaveBeenCalledWith(removeMovie({ imdbID: 'tt1234567' }));
  });
});

