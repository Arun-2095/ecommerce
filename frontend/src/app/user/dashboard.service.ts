import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
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
  
  public  setProductFilter(userFiler:ProductFilter) {
      this.Filter = userFiler;
  }


  public productList:Subject<ProductResponse[]>= new Subject<ProductResponse[]>()


 
  public getProduct():Observable<void> {
    return  this.http.post<ProductResponse[]>(Endpoints.GET_PRODUCT, this.productFilter).pipe(
     
    map((response:ProductResponse[]) => {
      
      let product =  response.map(datum => { 
        let selectedProductQuantity = Number(datum.quantities[0]).toFixed(1)
          if(datum.catagory === CATAGORY.CAKE){ 
          return {
            ...datum, 
            selectedProductQuantity,
            selectedProductCount:1,
            selectedProductPrice: datum.prices[selectedProductQuantity]
          }
        }else{
          return {
            ...datum,
            selectedProductQuantity,  
            selectedProductCount:1,
            selectedProductPrice: datum.prices[selectedProductQuantity]
          }
        }
        })
    
        this.productList.next(product)
      })
    )
  }

  public getCatagory(): Observable<Catagory[]> {
    return  this.http.get<Catagory[]>(Endpoints.GET_CATAGORY)
  }
}
