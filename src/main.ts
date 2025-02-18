import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { watchlistReducer } from './app/store/watchlist/watchlist.reducer';
import { APP_ROUTES } from './app/app-routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(APP_ROUTES),
    provideStore({ watchlist: watchlistReducer }), provideAnimationsAsync(),
  ],
});