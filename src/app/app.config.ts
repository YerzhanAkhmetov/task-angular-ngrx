import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment.development';
import { API_URL } from './libs/api-url';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { USERS_KEY, userReducer } from "../app/data-access/lib/users.reducer";
// import { provideClientHydration } from '@angular/platform-browser';
import { UserEffects } from "../app/data-access/lib/users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(), //добавми что бы потом не использовать HTTP
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideAnimations(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideStore({
      [USERS_KEY]: userReducer,
    }),
    provideEffects(UserEffects),
  ]
};

//routes  -- принимает массив routes из файла app.routes, который содержит определение маршрутов приложения.
// provideClientHydration - предоставляет возможность предварительного рендеринга на стороне
//сервера и улучшает производительность приложения.

// provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
//withEnabledBlockingInitialNavigation()  --- гарантирует, что начальная навигация будет блокироваться до
//тех пор, пока маршрутизатор не будет полностью инициализирован.