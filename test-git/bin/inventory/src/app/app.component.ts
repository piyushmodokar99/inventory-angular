import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory';

  role:Role;

  constructor(private router: Router, private authService: AuthService){}

  get isAuthorized() {
    return this.authService.isAuthorized();
  }

  get isAdmin() {
    //console.log("isAdmin : " + Role.Admin);
    return this.authService.hasRole(Role.Admin);
  }

  get isEditor() {
    //console.log("isAdmin : " + Role.Admin);
    return this.authService.hasRole(Role.Editor);
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
