import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Const } from '../util/const';
import { HttpHeaders } from '@angular/common/http';
import { ProductsList, ProductsResult } from '../components/test-table/test-table.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', "Bearer " + localStorage.getItem("token"));

  options?:any = {'headers':this.headers};
  
  public getProducts(page:number, size:number) {
    console.log("Prod Token :" + this.headers.get("Authorization"));
    return this.http.post(Const.productListUrl, {page:page, size:size}, this.options);
  }

  public getProducts1(page:number, size:number) {
    console.log("Prod Token :" + this.headers.get("Authorization"));
    return this.http.post(Const.productListUrl, {page:page, size:size}, this.options);
  }

  public getProductById(ipId:any){
    return this.http.get(Const.getProductUrl + "?ipId=" + ipId, { 'headers': this.headers });
  }

  public updateProduct(req:ProductsList){
    return this.http.post(Const.updateProductUrl, req, { 'headers': this.headers });
  }

  public addProduct(req:ProductsList){
    return this.http.post(Const.addProductUrl, req, { 'headers': this.headers });
  }
}
