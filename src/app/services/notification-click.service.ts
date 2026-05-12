import {
  Injectable,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationClickService {

  private router = inject(Router);

  private platformId = inject(PLATFORM_ID);

  constructor() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    navigator.serviceWorker.addEventListener(
      'message',
      (event: any) => {

        const data = event.data;

        if (data?.type === 'OPEN_URL') {

          const url = data.url;

          // EXTERNAL URL
          if (url.startsWith('http')) {

            window.location.href = url;

            return;
          }

          // INTERNAL ROUTE
          this.router.navigateByUrl(url);
        }
      }
    );
  }
}