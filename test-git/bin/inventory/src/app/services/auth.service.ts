import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private user:User;

  isAuthorized(){
    return !!this.user;
  }

  hasRole(role:Role){
    if(this.user) return this.isAuthorized && this.user.role === role;
    else return false;
  }

  login(role: Role) {
    this.user = { role: role };
  }

  logout() {
    this.user = null;
  }

}

