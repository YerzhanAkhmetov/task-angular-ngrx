import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment.development';
import { API_URL } from './libs/api-url';
import { provideAnimations } from '@angular/platform-browser/animations';

// import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),//добавми что бы потом не использовать HTTP
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideAnimations(),
  ]
};

//routes  -- принимает массив routes из файла app.routes, который содержит определение маршрутов приложения.
// provideClientHydration - предоставляет возможность предварительного рендеринга на стороне
//сервера и улучшает производительность приложения.

// provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
//withEnabledBlockingInitialNavigation()  --- гарантирует, что начальная навигация будет блокироваться до
//тех пор, пока маршрутизатор не будет полностью инициализирован.