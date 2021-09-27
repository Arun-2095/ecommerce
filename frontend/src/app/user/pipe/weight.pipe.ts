import { Pipe, PipeTransform } from '@angular/core';
import { CATAGORY } from 'src/app/helpers/constant';

@Pipe({
  name: 'weight'
})

export class WeightPipe implements PipeTransform {

  transform(value: string, productType: number ): unknown {
    console.log(productType, "PRODUCT TYPE")
     if(productType === CATAGORY.CAKE ) {
      return value + " Kg";

     }else {
      return value + " Pieces * 1 Box";
     }   
    
  }

}
