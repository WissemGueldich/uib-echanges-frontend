import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class HasRoleGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.hasAny(route.data["authorities"]);
    }

    hasAny(authorities:any[]):boolean{
        for (let i = 0; i < this.authService.user.authorities.length; i++) {
            if(authorities.includes(Object.values(this.authService.user.authorities[i])[0])){
                console.log('Authorized.');
                return true
            }
        }
        return false;
    }

}