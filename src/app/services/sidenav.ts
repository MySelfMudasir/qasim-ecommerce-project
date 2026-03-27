import { Injectable, signal, computed, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private breakpointObserver = inject(BreakpointObserver);

  private _isMobile = signal(false);
  private _opened = signal(true);

  isMobile = this._isMobile.asReadonly();
  opened = this._opened.asReadonly(); // ✅ allow manual control


  mode = computed(() => {
    return this._isMobile() ? 'over' : 'side';
  });

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this._isMobile.set(result.matches);

      // ✅ Only set DEFAULT state, not force it forever
      if (result.matches) {
        this._opened.set(false); // mobile default closed
      } else {
        this._opened.set(true); // desktop default open
      }
    });
  }

  toggle() {
    this._opened.update(v => !v);
  }

  open() {
    this._opened.set(true);
  }

  close() {
    this._opened.set(false);
  }
}