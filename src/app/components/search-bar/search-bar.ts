import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ViewPanel } from '../../directives/view-panel';

@Component({
  selector: 'app-search-bar',
  imports: [MatButton, MatIcon, MatInputModule, ViewPanel],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {

}
