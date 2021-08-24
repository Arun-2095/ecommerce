export interface Catagory {
    id: number,
    catagory: string;
}

export interface ProductResponse {
    id:	number,
   product_name:string,
   catagory : number,
    quantities: number[],
   prices:	 {[x:string]: number }
}

export interface Product {
  id:	number,
 product_name:string,
 catagory : number,
 quantities: number[],
 prices:	 {[x:string]: number },
 selectedProduct: number,
 selectedProductPrice: string

}

export interface Product {
    id:	number,
   product_name:string,
   catagory : number,
   quantities: number[],
   prices:	 {[x:string]: number },
   selectedProduct: number,
   selectedProductPrice: string
  
  }

  export interface ProductFilter {
     catagory : number[]
  }