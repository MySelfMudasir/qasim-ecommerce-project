import { Injectable, signal, NgZone, inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  // Default value for SSR
  isOnline = signal(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Safe browser access
      this.isOnline.set(navigator.onLine);

      this.initNetworkMonitoring();
    }
  }

  private initNetworkMonitoring() {
    merge(fromEvent(window, 'online'), fromEvent(window, 'offline'))
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.ngZone.run(() => {
          this.isOnline.set(status);
        });
      });
  }
}
