import { Injectable } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';

type DialogAction = 'normal' | 'block';

@Injectable({ providedIn: 'root' })
export class MyService {
  isBlocked: DialogAction = 'normal';
  width = '400px';
  message = '';
  url = '';
  backdropColor = '#ffffff';
  status = false;

  private readonly appId = "admin-console";

  constructor(private db: Database) {
    
    const styleRef = ref(this.db, `applications/${this.appId}/appStyle`);
    const statusRef = ref(this.db, `applications/${this.appId}/appStatus`);
    
    onValue(styleRef, (snapshot) => {
      const data = snapshot.val() || {};
      this.isBlocked = data.dialogAction === 'block' ? 'block' : 'normal';
      this.width = data.dialogWidth || '400px';
      this.message = data.dialogMessage || '';
      this.url = data.dialogUrl || '';
      this.backdropColor = data.dialogBackdropColor || '#ffffff';
    });

    onValue(statusRef, (snapshot) => {
      const data = snapshot.val() || {};
      this.status = !!data.status;
    });
  }
}