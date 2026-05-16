import { Component, effect, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ViewPanel } from './directives/view-panel';
import { EcommerceStore } from './ecommerce-store';
import { PreLoader } from './shared/pre-loader/pre-loader';
import { ThemeService } from './services/theme';
// import { Database, ref, set, onValue } from '@angular/fire/database';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { log } from 'node:console';
import { MyService } from './services/my-service';
import { Footer } from './layout/footer/footer';
import { MenuBar } from './components/menu-bar/menu-bar';
import { SkeletonComponent } from 'boneyard-js/angular';
import { PushNotificationService } from './services/push-notification.service';
import { NetworkService } from './services/network-service';
import { Toaster } from './services/toaster';
import { MatDialog } from '@angular/material/dialog';
import { AdvertisementDialog } from './components/advertisement-dialog/advertisement-dialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    ViewPanel,
    CommonModule,
    PreLoader,
    Footer,
    MenuBar,
    SkeletonComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ecommerce');
  private readonly platformId = inject(PLATFORM_ID);

  isBlocked: string = '';
  width: string = '';
  message: string = '';
  url: string = '';
  backdropColor: string = '';
  status: boolean = true;

  // myService = inject(MyService);
  store = inject(EcommerceStore);
  themeService = inject(ThemeService);
  private push = inject(PushNotificationService);
  private networkService = inject(NetworkService);
  toster = inject(Toaster);
  isOnline = this.networkService.isOnline;
  private onLoadConnectionStatus = false;
  private hasInitializedConnectionState = false;

  constructor(private dialog: MatDialog) {
    effect(() => {
      const online = this.isOnline();

      if (!this.hasInitializedConnectionState) {
        this.onLoadConnectionStatus = online;
        this.hasInitializedConnectionState = true;
        return;
      }

      if (online && !this.onLoadConnectionStatus) {
        this.toster.success("You're Online. Connection is restored.");
        console.log('Connection restored. Flushing pending actions.');
      } else if (!online && this.onLoadConnectionStatus) {
        this.toster.error("You're offline. Check your Connection.");
        console.log('Connection lost. Queuing network actions.');
      }
      this.onLoadConnectionStatus = online;
    });
  }

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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.push.requestPermission();
    this.push.listen();

    const loader = document.getElementById('global-loader');
    if (loader) {
      loader.remove();
    }

    this.advertisementDialog('https://www.google.com');
  }

  advertisementDialog(url: string) {
    setTimeout(() => {
      this.dialog.open(AdvertisementDialog, {
        data: {
          advertisementUrl: url,
        },
        panelClass: 'ad-dialog-panel',
        backdropClass: 'ad-dialog-backdrop',
        disableClose: true,
        autoFocus: false,
        maxWidth: '100vw',
        width: 'auto',
        height: 'auto',
      });
    }, 800);
  }
}
