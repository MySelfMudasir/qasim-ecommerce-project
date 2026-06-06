import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { StateService } from '../services/state-service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(StateService);
  const authService = inject(AuthService);
  const token = stateService.getGlobalAuthToken();

  const headersConfig: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headersConfig['Authorization'] = `Bearer ${token}`;
  }

  const authReq = req.clone({ setHeaders: headersConfig });
  
  // return next(authReq);
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 || error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};
