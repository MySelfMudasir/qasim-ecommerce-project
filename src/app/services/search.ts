import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
 private _showProgressBar = signal(false);

 showProgressBar = this._showProgressBar.asReadonly();

 toggle(){
  this._showProgressBar.update(v => !v);
 }

   open() {
    this._showProgressBar.set(true);
  }

  close() {
    this._showProgressBar.set(false);
  }


}
