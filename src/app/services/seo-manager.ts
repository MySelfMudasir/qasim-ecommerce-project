import { inject, Injectable } from '@angular/core';
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
  request = inject(Request, { optional: true });

  private readonly siteName = 'Khyber Foods LTD';
  private defaultDescription =
    'Welcome to Khyber Foods LTD, your one-stop shop for delicious and authentic food products. Explore our wide range of offerings and enjoy the taste of quality.';
  private defaultImage = 'https://dummyimage.com/600x400/ffffff/030003.png&text=Mudasir';

  updateSeoTags(seoData: SeoData) {
    this.title.setTitle(`${seoData.title} | ${this.siteName}`);
    this.meta.updateTag({ name: 'description', content: seoData.description || this.defaultDescription });

    let origin = '';
    if (this.request) {
    const headers = this.request.headers as Headers | undefined;
    const protocol = (headers?.get('x-forwarded-proto') || this.request.url.split(':')[0] || 'https') + '://';
    const host = headers?.get('x-forwarded-host') || headers?.get('host') || '';
    origin = host ? `https://${host}` : '';
    } else if (typeof window !== 'undefined') {
    origin = window.location.origin;
    }
    
    const fullurl = `${origin}${this.router.url}`;



    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullurl);


    const imageUrl = seoData.image || this.defaultImage;


    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:url', content: fullurl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });


  }

  
}
