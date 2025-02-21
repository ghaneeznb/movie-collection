import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RemoveAfterColonPipe } from "../../core/pipes/remove-after-colon.pipe";
import { RouterModule } from '@angular/router';
import { Movie } from '../../core/models/movie.model';
import { By } from '@angular/platform-browser';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: Movie = {
    imdbID: 'tt1234567',
    Title: 'Iron Man',
    Year: '2008',
    Poster: 'ironman.jpg',
    Plot: 'A billionaire becomes Iron Man.',
    Ratings: [],
    Type: 'movie'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, RouterModule, RemoveAfterColonPipe],
      declarations: [MovieCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept movie input', () => {
    component.movie = mockMovie;
    fixture.detectChanges();

    expect(component.movie.Title).toBe('Iron Man');
  });

  it('should emit remove event when removeMovie is called', () => {
    spyOn(component.remove, 'emit');

    component.movie = mockMovie;
    component.removeMovie();

    expect(component.remove.emit).toHaveBeenCalledWith(mockMovie.imdbID);
  });

  it('should display movie title correctly', () => {
    component.movie = mockMovie;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.movie-title'));
    expect(titleElement.nativeElement.textContent).toContain('Iron Man');
  });
});
