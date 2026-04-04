import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ThemeService } from './services/theme';
import { APP_INITIALIZER } from '@angular/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHotToastConfig(),
    provideHotToastConfig({
      style: {
        marginTop: '70px'
      },
      stacking: 'depth',
      duration: 1000,
    }),


    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideDatabase(() => getDatabase()), provideClientHydration(withEventReplay())


    provideClientHydration(withEventReplay()),
    // THEME INIT (CORRECT PLACE)
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const themeService = inject(ThemeService);
        return () => themeService.initTheme();
      },
      multi: true,
    }, provideClientHydration(withEventReplay())



  ]
};
