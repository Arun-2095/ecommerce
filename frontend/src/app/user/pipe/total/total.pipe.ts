import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total'
})
export class TotalPipe implements PipeTransform {

  transform(value: any[] =[], args: {priceKey:string, quantityKey:string}[]): unknown {
    
    let requiredKeys = args.shift()
    return value.reduce((acc, item)=> acc + (item[requiredKeys.priceKey] * item[requiredKeys.quantityKey]),0)
  }

}
