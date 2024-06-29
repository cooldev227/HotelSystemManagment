import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ApiServiceService } from './api-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ApiServiceService, private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {


    if (this.authService.isLoggedIn()) {

      const token = this.authService.getoken();

      // Verificar si el token es válido
      if (!this.jwtHelper.isTokenExpired(token)) {

        return true;

      } else {

        localStorage.clear();
        this.router.navigate(['home/login']);
        return false;
      }

    } else {

      this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
