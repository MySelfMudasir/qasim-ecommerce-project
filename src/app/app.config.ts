import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
  withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ThemeService } from './services/theme';
import { APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ScrollToTopGuard } from './guards/scroll-to-top.guard';
import { provideServiceWorker } from '@angular/service-worker';
import { NotificationClickService } from './services/notification-click.service';
// import { cacheInterceptor } from './interceptors/cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled' }),
    ),

    // provideHttpClient(withInterceptors([cacheInterceptor])),

    provideHotToastConfig(),
    provideHotToastConfig({
      style: {
        cursor: 'not-allowed',
        pointerEvents: 'none !important',
        marginTop: '70px',
      },
      stacking: 'depth',
      duration: 500,
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
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject(ScrollToTopGuard);
        inject(NotificationClickService);
        return () => undefined;
      },
      multi: true,
    },
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
