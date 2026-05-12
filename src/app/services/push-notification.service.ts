import { Injectable, inject, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { initializeApp } from 'firebase/app';

import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private platformId = inject(PLATFORM_ID);

  private messaging: Messaging | null = null;

  constructor() {
    // SSR SAFETY
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // FIREBASE INIT
    const app = initializeApp(environment.firebase);

    this.messaging = getMessaging(app);
  }

  async requestPermission() {
    // SSR SAFETY
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // SAFETY
    if (!this.messaging) {
      return;
    }

    try {
      const token = await getToken(this.messaging, {
        vapidKey: 'BLXqC6Z62fmLCWh-bLxYoTxr_4A6cdCo6u8eJ8qz597NltP4ZhlviPhWje_zRBnCBIEn-DT2g6SzqlVBDS4LYXo',
      });

      console.log('FCM TOKEN:', token);
    } catch (error) {
      console.error('FCM ERROR:', error);
    }
  }

  listen() {
    // SSR SAFETY
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // SAFETY
    if (!this.messaging) {
      return;
    }

    onMessage(this.messaging, (payload) => {

  console.log('Foreground notification:', payload);

  new Notification(
    payload.notification?.title || 'Khyber Foods',
    {
      body: payload.notification?.body,
      icon: '/icons/icon-192x192.png'
    }
  );

});
  }
}
