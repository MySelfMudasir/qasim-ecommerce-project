import { Injectable, inject } from '@angular/core';
import { StateService } from './state-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly stateService = inject(StateService);
  private isAuthenticated = false;

  setSession(token: string): void {
    this.stateService.setGlobalAuthToken(token);
    this.isAuthenticated = true;
  }

  login(email: string, password: string): boolean {
    void email;
    void password;
    this.setSession(crypto.randomUUID());
    return true;
  }

  logout(): void {
    this.stateService.clearGlobalAuthToken();
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || Boolean(this.stateService.getGlobalAuthToken());
  }

  getToken(): string {
    return this.stateService.getGlobalAuthToken();
  }
}
