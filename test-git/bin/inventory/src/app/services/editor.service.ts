import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Const } from '../util/const';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  

  constructor(private http:HttpClient) { }

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', "Bearer " + localStorage.getItem("token"));

  options?:any = {'headers':this.headers};

  public getGraphData(){
    return this.http.get(Const.getGraphUrl, this.options);
  }

  addExpence(value: any) {
    return this.http.post(Const.addExpenceUrl, value, this.options);
  }
}
