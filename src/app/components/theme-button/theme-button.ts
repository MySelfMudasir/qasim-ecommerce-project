import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from '../../services/theme';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-theme-button',
  imports: [MatButtonModule, MatIcon],
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
