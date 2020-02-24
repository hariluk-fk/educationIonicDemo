import { Injectable } from '@angular/core';
import { product } from 'src/app/model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIService } from 'src/app/service/APIService';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productTmp: Observable<product>;
  status: any;

  constructor(private http: HttpClient, private apiService: APIService) { }

  getProductById(productId: string): Observable<product> {
    const param = [];
    const url = 'product/searchProductById';
    param[0] = productId;
    // this.profile = from(await this.dataService.getSingle(this.url, this.param).toPromise());
    this.productTmp = this.apiService.getSingle(url, param);
    return this.productTmp;
  }

  updateProduct(productUpdate: any): Observable<any> {
    const url = 'product/updateProduct';
    this.status = this.apiService.update(url, productUpdate).subscribe((data) => {
      this.status = data[0];
    });
    return this.status;
  }
}
