import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ViewPanel } from './directives/view-panel';
import { EcommerceStore } from './ecommerce-store';
import { PreLoader } from './shared/pre-loader/pre-loader';
import { AppTitleService } from './services/app-title-strategy';
import { ThemeService } from './services/theme';
// import { Database, ref, set, onValue } from '@angular/fire/database';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { log } from 'node:console';
import { MyService } from './services/my-service';
import { Footer } from "./layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ViewPanel, CommonModule, PreLoader, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ecommerce');
  // private isBrowser: boolean;

  isBlocked: string = '';
  width: string = '';
  message: string = '';
  url: string = '';
  backdropColor: string = '';
  status: boolean = true;



  // myService = inject(MyService);
  titleService = inject(AppTitleService);
  store = inject(EcommerceStore);
  themeService = inject(ThemeService);

  
  
  
  // constructor(private db: Database) {
  // constructor() {

    // const styleRef = ref(this.db, 'appStyle');
    // const statusRef = ref(this.db, 'appStatus');

    // onValue(styleRef, (snapshot) => {
    //   const data = snapshot.val();

    //   if (data) {
    //     this.isBlocked = data.dialogAction || '';
    //     this.width = data.dialogWidth || '';
    //     this.message = data.dialogMessage || '';
    //     this.url = data.dialogUrl || '';
    //     this.backdropColor = data.dialogBackdropColor || '';

    //     if (this.isBlocked === 'block') {
    //       this.status = true;
    //     } else {
    //       this.status = false;
    //     }

    //     set(statusRef, {
    //       status: this.status,
    //     });
    //   }
    // });

  // }


// constructor(
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(this.platformId);

//     // Router loader (safe)
//     this.router.events.subscribe(event => {

//       if (event instanceof NavigationStart) {
//         this.store.setPreLoader(true);
//       }

//       if (
//         event instanceof NavigationEnd ||
//         event instanceof NavigationCancel ||
//         event instanceof NavigationError
//       ) {
//         this.store.setPreLoader(false);
//       }

//     });
//   }

  ngOnInit() {    
    // ONLY run in browser
    // if (this.isBrowser) {
      const loader = document.getElementById('global-loader');
      if (loader) {
        loader.remove();
      }
    // }
  }









}
