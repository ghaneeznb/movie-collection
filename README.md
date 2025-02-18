# Movie Collection Browser

A modern Angular application for browsing movies, viewing details, and managing a personal watchlist. Built with **Angular Standalone Components**, **NgRx for state management**, and **lazy-loaded routes** for efficiency.

---

## Features

### Movie List
- Fetch movies from **TMDb API** or **OMDb API**.
- Display **title, release year, genre, and poster**.
- Search & filter movies by title or genre (**Bonus**).

### Movie Detail View
- Navigate to a **detailed page** with a movie synopsis, rating, and cast.
- Uses **Angular Router** for deep linking.

### Watchlist (State Management with NgRx)
- Add/remove movies to a personal watchlist.
- Uses **NgRx Store** for state management.
- **Persisted in local storage** for session retention.

### Reusable Components
- **Movie Card** (Used in Movie List and Watchlist).
- **Button Component** (For adding/removing movies).
- **Loading Spinner** (For async operations).

### Testing
- **Unit Tests**: Written using **Jest** for services, components, and NgRx store.
- **E2E Tests**: Using **Cypress** to validate user interactions.

 ### Author
Zeynab Ghane | (https://github.com/ghaneeznb)

