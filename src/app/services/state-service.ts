import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly TOKEN_KEY = 'globalAuthToken';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly request = inject(Request, { optional: true });
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  setGlobalAuthToken(token: string) {
    if (!this.isBrowser) {
      return;
    }

    document.cookie = `${this.TOKEN_KEY}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
  }

  clearGlobalAuthToken() {
    if (!this.isBrowser) {
      return;
    }

    document.cookie = `${this.TOKEN_KEY}=; path=/; Max-Age=0; SameSite=Lax`;
  }

  getGlobalAuthToken() {
    const cookieSource = this.isBrowser
      ? document.cookie
      : (this.request?.headers.get('cookie') ?? '');

    if (!cookieSource) {
      return '';
    }

    const name = `${this.TOKEN_KEY}=`;

    for (const cookie of cookieSource.split(';')) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(name)) {
        return decodeURIComponent(trimmedCookie.substring(name.length));
      }
    }

    return '';
  }
}
