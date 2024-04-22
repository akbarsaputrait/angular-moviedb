import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { Action, provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { FavoritesEffects } from './core/states/favorites/favorites.effects';
import * as fromFavorites from './core/states/favorites/favorites.reducer';
import { GenresEffects } from './core/states/genres/genres.effects';
import * as fromGenres from './core/states/genres/genres.reducer';
import { storeMetaReducers } from './libs/state.lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects([FavoritesEffects, GenresEffects]),
    provideState(fromGenres.GENRES_FEATURE_KEY, fromGenres.genresReducer),
    provideState(
      fromFavorites.FAVORITES_FEATURE_KEY,
      fromFavorites.favoritesReducer,
      {
        metaReducers: [
          function meta(reducer) {
            return function (state: any, action: any) {
              return storeMetaReducers<fromFavorites.FavoritesState, Action>(
                fromFavorites.FAVORITES_FEATURE_KEY,
                reducer,
                state,
                action
              );
            };
          },
        ],
      }
    ),
    provideClientHydration(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
  ],
};
