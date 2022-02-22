import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Endpoints } from "src/app/helpers/endpoints";
import { Catagory, ProductFilter, ProductResponse, CartItemResponse, DeleteCartRequest } from "./interface/dashboard"
import { map, tap } from 'rxjs/operators';
import { CATAGORY } from '../helpers/constant';
import { userAddress } from '../interface/event';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private Filter: ProductFilter = {
    catagory: []
  }


  public get productFilter() {
    return this.Filter;
  }

  public setProductFilter(userFiler: ProductFilter) {
    this.Filter = userFiler;
  }


  public productList: Subject<ProductResponse[]> = new Subject<ProductResponse[]>()

  public cartList: Subject<CartItemResponse> = new Subject<CartItemResponse>()



  public getProduct(): Observable<void> {
    return this.http.post<ProductResponse[]>(Endpoints.GET_PRODUCT, this.productFilter).pipe(

      map((response: ProductResponse[]) => {

        let product = response.map(datum => {
          let selectedProductQuantity = Number(datum.quantities[0]).toFixed(1)
          if (datum.catagory === CATAGORY.CAKE) {
            return {
              ...datum,
              selectedProductQuantity,
              selectedProductCount: 1,
              selectedProductPrice: datum.prices[selectedProductQuantity]
            }
          } else {
            return {
              ...datum,
              selectedProductQuantity,
              selectedProductCount: 1,
              selectedProductPrice: datum.prices[selectedProductQuantity]
            }
          }
        })

        this.productList.next(product)
      })
    )
  }

  public getCatagory(): Observable<Catagory[]> {
    return this.http.get<Catagory[]>(Endpoints.GET_CATAGORY)
  }

  public addToCart(cartItem): Observable<any> {
    return this.http.post(Endpoints.ADD_TO_CART, cartItem)
  }

  public getCartItems(): Observable<CartItemResponse> {
    return this.http.get<CartItemResponse>(Endpoints.GET_CART_ITEMS).pipe(tap(cartList => {
      this.cartList.next(cartList)
    }))
  }

  public deleteCartItem(product_id: number, cart_id: number): Observable<any> {
    let httpParams = new HttpParams().set('cart_id', cart_id.toString()).set('product_id', product_id.toString());

    return this.http.delete(Endpoints.ADD_TO_CART, { params: httpParams })

  }

  public addAddress(data: { address: userAddress }): Observable<any> {
    return this.http.post(Endpoints.ADD_ADDRESS, data)
  }

}
