import { Pipe, PipeTransform } from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';
  
@Pipe({
    name: 'amountToStr'
})
export class ConvertAmountToStr implements PipeTransform {
  transform(amount: number, args?: any): string {
    if (amount < 1000) {
      return '£' + amount;
    } else if (amount >= 1000 && amount < 1000000) {
      return '£' + (amount / 1000).toFixed(2) + 'k';
    } else {
      return '£' + (amount / 1000000).toFixed(1) + 'm';
    }
  }
}