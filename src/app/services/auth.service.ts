// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, map, Observable } from 'rxjs';
// import { ApiService } from '../api/api.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//   isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

//   constructor(private router: Router, private apiService: ApiService) {
//     this.checkAuthToken();
//   }


//   private checkAuthToken(): void {
//     const token = sessionStorage.getItem('globalAuthToken');
//     this.isAuthenticatedSubject.next(!!token);
//   }



//   setCurrentLoginUserRole(role: string) {
//     localStorage.setItem('CurrentLoginUserRole', role);
//   }

//   getCurrentLoginUserRole() {
//     return localStorage.getItem('CurrentLoginUserRole') || '';
//   }

//   setGlobalAuthToken(token: string) {
//     sessionStorage.setItem('globalAuthToken', token);
//     this.checkAuthToken();
//   }
 
//   getGlobalAuthToken() {
//     return sessionStorage.getItem('globalAuthToken') || '';
//   }

//   refreshToken(): Observable<string> {
//     return this.apiService.generateToken().pipe(
//       map((response: any) => {
//         const newToken = response?.response_message || '';
//         if (newToken) {
//           this.setGlobalAuthToken(newToken);
//         }
//         return newToken;
//       })
//     );
//   }


  
//   setCurrentLoginUserDetails(data: object) {
//     return localStorage.setItem('CurrentLoginUserDetails', JSON.stringify(data));
//   }

//   getCurrentLoginUserDetails() {
//     const data = localStorage.getItem('CurrentLoginUserDetails');
//     return data ? JSON.parse(data) : null;
//   }


//   logout() {
//     localStorage.removeItem('CurrentLoginUserRole'); 
//     sessionStorage.removeItem('globalAuthToken');
//     this.router.navigate(['/login']); // Redirect to login
//   }



// }
