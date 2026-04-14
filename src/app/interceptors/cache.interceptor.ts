import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache = new Map<string, HttpResponse<any>>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  const cached = cache.get(req.urlWithParams);

  if (cached) {
    console.log('⚡ CACHE HIT:', req.urlWithParams);
    return of(cached); // return cached response instantly
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log('🌐 CACHE STORE:', req.urlWithParams);
        cache.set(req.urlWithParams, event);
      }
    })
  );
};