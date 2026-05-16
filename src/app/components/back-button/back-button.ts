import { Component, input } from '@angular/core';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-back-button',
  imports: [SharedModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {

  navigateTo = input<string>();

}
