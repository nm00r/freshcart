import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/'

  getProducts(pageNum:number=1):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'categories')
  }

  getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products/${id}`)
  }
  getAllBrands():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  
}
