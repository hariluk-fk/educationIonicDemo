import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from 'src/app/service/APIService';
import { product } from 'src/app/model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  productList: Observable<product>;

  constructor(private http: HttpClient, private apiService: APIService) { }

  getAllProduct(): Observable<product> {
    const param = [];
    const url = 'product/searchAll';
    // this.profile = from(await this.dataService.getSingle(this.url, this.param).toPromise());
    this.productList = this.apiService.getAll(url);
    return this.productList;
  }
}
