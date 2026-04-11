import { Injectable, signal } from '@angular/core';
// import { Database, onValue, ref } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class MyService {

  isBlocked = signal<'normal' | 'block'>('normal');
  width = signal('400px');
  message = signal('');
  url = signal('');
  backdropColor = signal('#ffffff');
  status = signal(false);

  private readonly appId = "admin-console";

  // constructor(private db: Database) {
  constructor() {

  //   const styleRef = ref(this.db, `applications/${this.appId}/appStyle`);
  //   const statusRef = ref(this.db, `applications/${this.appId}/appStatus`);

  //   onValue(styleRef, (snapshot) => {
  //     const data = snapshot.val() || {};

  //     this.isBlocked.set(data.dialogAction === 'block' ? 'block' : 'normal');
  //     this.width.set(data.dialogWidth || '400px');
  //     this.message.set(data.dialogMessage || '');
  //     this.url.set(data.dialogUrl || '');
  //     this.backdropColor.set(data.dialogBackdropColor || '#ffffff');
  //   });

  //   onValue(statusRef, (snapshot) => {
  //     const data = snapshot.val() || {};
  //     this.status.set(!!data.status);
  //   });
  
  
  
  // setTimeout(() => {
  //   console.log('App initialized');
  //   document.body.innerHTML = '';
  // }, 3000);
  
}

}