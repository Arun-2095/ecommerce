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

  export interface CartItem {
    product_name : string ;
    product_price : string ;
    product_quantity: string ;
    product_id	:number;
    selected_product: string; 
    price: string;
  }
  export interface CartItemResponse {
    cartId : number;
    cartItems:CartItem[]
  }

  export interface DeleteCartRequest {
   product_id : number;
   cart_id :number;
  }