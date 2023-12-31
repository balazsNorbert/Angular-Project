import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map,tap } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>{
            return this.authService.user.pipe(map(user => {
                return !!user;
            }),tap(isAuth => {
                if(!isAuth){
                    this.router.navigate(['/auth']);
                }
            }));
        }
}