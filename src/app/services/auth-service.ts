import { Injectable, inject } from '@angular/core';
import { StateService } from './state-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly stateService = inject(StateService);
  private router = inject(Router);

  setSession(token: string): void {
    this.stateService.setGlobalAuthToken(token);
  }

  login(email: string, password: string): boolean {
    this.setSession(crypto.randomUUID());
    return true;
  }

  logout(): void {
    this.stateService.clearGlobalAuthToken();
    console.log('Logged out successfully');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.stateService.getGlobalAuthToken();
  }

  getToken(): string {
    return this.stateService.getGlobalAuthToken();
  }
}