// title.service.ts
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class AppTitleService {

  private appName = 'Khyber Foods LTD';

  constructor(private title: Title) {}

  setTitle(title: string) {
    this.title.setTitle(`${title} - ${this.appName}`);
  }

  resetTitle() {
    this.title.setTitle(this.appName);
  }

}