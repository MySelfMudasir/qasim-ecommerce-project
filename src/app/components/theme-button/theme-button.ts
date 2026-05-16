import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { SharedModule } from '../../modules/shared';

@Component({
  selector: 'app-theme-button',
  imports: [SharedModule],
  templateUrl: './theme-button.html',
  styleUrl: './theme-button.scss',
})
export class ThemeButton {
  themeService = inject(ThemeService);

  get isDark() {
    return this.themeService.isDark;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
