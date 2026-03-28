import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { ViewPanel } from "./directives/view-panel";
import { EcommerceStore } from './ecommerce-store';
import { PreLoader } from "./shared/pre-loader/pre-loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ViewPanel, PreLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce');
  store = inject(EcommerceStore);
}
