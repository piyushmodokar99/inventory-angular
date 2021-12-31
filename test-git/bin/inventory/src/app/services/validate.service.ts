import { Injectable } from '@angular/core';
import decode from 'jwt-decode';



export interface tokenDetails {
  sub?:string;
  role?:string;
  exp?:string;
  iat?:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  
  constructor() { }
  
  validateToken(token: string) {
    //console.log("Token : " + token);
    const tokenPayload:tokenDetails = decode(token);
    
    //console.log("Decoded token : " + JSON.stringify(tokenPayload));
    //console.log("Role : " + tokenPayload.role);

    return tokenPayload.role;
  }

  
}
