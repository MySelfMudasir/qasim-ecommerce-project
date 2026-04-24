import { inject, Injectable, REQUEST } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SeoData } from '../models/seo-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SeoManager {
  title = inject(Title);
  meta = inject(Meta);
  router = inject(Router);
  document = inject(DOCUMENT);
  request = inject(REQUEST, { optional: true });

  private readonly siteName = 'Khyber Foods LTD';
  private defaultDescription =
    'Welcome to Khyber Foods LTD, your one-stop shop for delicious and authentic food products. Explore our wide range of offerings and enjoy the taste of quality.';
  private defaultImage = '/assets/logo4.png';

  updateSeoTags(seoData: SeoData) {
    this.title.setTitle(`${seoData.title} | ${this.siteName}`);
    this.meta.updateTag({ name: 'description', content: seoData.description || this.defaultDescription });

    const origin = this.resolveOrigin();
    const fullurl = new URL(this.router.url || '/', origin).toString();



    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullurl);


    const imageUrl = this.toAbsoluteUrl(seoData.image || this.defaultImage, origin);


    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:url', content: fullurl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });


    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'twitter:url', content: fullurl });

  }

  private resolveOrigin(): string {
    if (this.request) {
      const headers = this.request.headers as Headers;
      const forwardedProto = headers.get('x-forwarded-proto');
      const forwardedHost = headers.get('x-forwarded-host');
      const host = forwardedHost || headers.get('host');
      if (host) {
        return `${forwardedProto || 'https'}://${host}`;
      }
    }

    if (typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }

    const configuredOgUrl = this.document
      .querySelector('meta[property="og:url"]')
      ?.getAttribute('content');
    if (configuredOgUrl) {
      try {
        return new URL(configuredOgUrl).origin;
      } catch {
        // Ignore malformed static meta values.
      }
    }

    return 'https://qasim-ecommerce-project.onrender.com';
  }

  private toAbsoluteUrl(value: string, origin: string): string {
    try {
      return new URL(value, origin).toString();
    } catch {
      return value;
    }
  }

  
}
