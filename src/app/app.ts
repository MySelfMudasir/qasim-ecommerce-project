import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ViewPanel } from './directives/view-panel';
import { EcommerceStore } from './ecommerce-store';
import { PreLoader } from './shared/pre-loader/pre-loader';
import { AppTitleService } from './services/app-title-strategy';
import { ThemeModeService } from './services/theme-mode';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ViewPanel, PreLoader, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ecommerce');
  isDark = false;

  isBlocked: string = '';
  width: string = '';
  message: string = '';
  url: string = '';
  backdropColor: string = '';
  status: boolean = true;



  titleService = inject(AppTitleService);
  store = inject(EcommerceStore);
  themeService = inject(ThemeModeService);

  
  
  
  constructor(private db: Database) {


    setInterval(() => {
      this.store.setPreLoader(false);
    }, 1000);


    const styleRef = ref(this.db, 'appStyle');
    const statusRef = ref(this.db, 'appStatus');

    onValue(styleRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        this.isBlocked = data.dialogAction || '';
        this.width = data.dialogWidth || '';
        this.message = data.dialogMessage || '';
        this.url = data.dialogUrl || '';
        this.backdropColor = data.dialogBackdropColor || '';

        if (this.isBlocked === 'block') {
          this.status = true;
        } else {
          this.status = false;
        }

        set(statusRef, {
          status: this.status,
        });
      }
    });

  }




  ngOnInit() {
    this.themeService.initTheme(); // set theme from localStorage or OS    
  }



}
