import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ContextService } from "../services/context.service";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private context: ContextService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return (this.context.getUser()?.role == 'Admin');
  }
   
}