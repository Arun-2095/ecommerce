import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import {Endpoints} from "src/app/helpers/endpoints";
import {Catagory, ProductFilter, ProductResponse} from "./interface/dashboard"
import { map } from 'rxjs/operators';
import { CATAGORY } from '../helpers/constant';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  
  private Filter :ProductFilter = {
    catagory : []
  }


  public get productFilter() {
    return this.Filter;
  }
  
  public set productFilter(userFiler:ProductFilter) {

      this.Filter = userFiler;
  }

  public getProduct():Observable<ProductResponse[]> {
    return  this.http.post<ProductResponse[]>(Endpoints.GET_PRODUCT, this.productFilter).pipe(
     
    map((response:ProductResponse[]) => {
      
      return response.map(datum => { 

          if(datum.catagory === CATAGORY.CAKE){
          let selectedProduct = Number(datum.quantities[0]).toFixed(1)
  
          return {
            ...datum, 
            selectedProduct,
            selectedProductPrice: datum.prices[selectedProduct]
          }
        }else{
          let selectedProduct = Number(datum.quantities[0]).toFixed(1)
          return {
            ...datum, 
            selectedProductCount:1,
            selectedProductPrice: datum.prices[selectedProduct]
          }
        }
        })
    
      })
    )
  }

  public getCatagory(): Observable<Catagory[]> {
    return  this.http.get<Catagory[]>(Endpoints.GET_CATAGORY)
  }
}
