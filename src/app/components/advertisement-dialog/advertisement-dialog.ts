import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-advertisement-dialog',
  imports: [SharedModule],
  templateUrl: './advertisement-dialog.html',
  styleUrl: './advertisement-dialog.scss',
})
export class AdvertisementDialog {
  private readonly data = inject(MAT_DIALOG_DATA);

  public readonly advertisementUrl = this.data?.advertisementUrl || '';

  constructor(private dialogRef: MatDialogRef<AdvertisementDialog>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
