import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/role';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, 
              private authService: AuthService,
              private validateService: ValidateService) { }
  showSpinner:boolean = false;
  hide = true;
  
  hero = {username: '', password: ''};

  //username: string;
  //password: string;
  loginMsg: string;
  loginResp: any;

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  login() : void 
  {
    console.log("Inside Login");
    this.loginService.login(this.hero.username, this.hero.password).subscribe(
      resp => {
        this.loginResp = resp;
        
        if(this.loginResp.status == 1)
        {
          console.log("Login Response Status: " + this.loginResp.status);
          localStorage.setItem("token", this.loginResp.token);
          localStorage.setItem("sessionId", this.loginResp.sessionId);
          sessionStorage.setItem("user", this.loginResp.username)
          
          //console.log("Login 1 with role " + this.loginResp.userRole);
          //Taking role from JWT
          const userRole = this.validateService.validateToken(this.loginResp.token);

          if(userRole === 'ROLE_ADMIN')
            this.authService.login(Role.Admin);
          else if(userRole === 'ROLE_USER')
            this.authService.login(Role.User);
          else if(userRole === 'ROLE_EDITOR')
            this.authService.login(Role.Editor);

          this.router.navigate(["home"]);
        }
        else 
        {
          this.loginMsg = 'Please Enter Valid Username or Password';
        }
      }
      
    );


  }

  

  login1(role: Role) {
    console.log("Login 1 with role " + role);
    this.authService.login(role);
    this.router.navigate(['home']);
  }

}
