import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Role } from "./model/role";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad 
{
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(!this.authService.isAuthorized()){
            this.router.navigate(["login"]);
            return false;
        }

        const roles = route.data.roles as Role[];
        if(roles && !roles.some(r => this.authService.hasRole(r))){
            this.router.navigate(["home/form"]);
            return false;
        }
        
        return true;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.authService.isAuthorized()) {
            return false;
        }

        console.log(route.data);

        const roles = route.data && route.data.roles as Role[];
        if (roles && !roles.some(r => this.authService.hasRole(r))) {
            return false;
        }

        return true;
    }

    
}