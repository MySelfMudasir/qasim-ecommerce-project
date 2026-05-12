import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PwaInstallService {
  private platformId = inject(PLATFORM_ID);

  deferredPrompt: any = null;

  canInstall = signal(false);

  constructor() {
    // SSR SAFETY CHECK
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();

      this.deferredPrompt = event;

      this.canInstall.set(true);
    });
  }

  async installPwa() {
    // SSR SAFETY CHECK
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.deferredPrompt) {
      return;
    }

    this.deferredPrompt.prompt();

    await this.deferredPrompt.userChoice;

    this.deferredPrompt = null;

    this.canInstall.set(false);
  }
}
