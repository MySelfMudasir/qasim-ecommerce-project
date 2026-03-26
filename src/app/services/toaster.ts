import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  
  toster = inject(HotToastService);

  success(message: string) {
    this.toster.success(message);
  }

  error(message: string) {
    this.toster.error(message);
  }

  
}
