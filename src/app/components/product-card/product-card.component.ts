import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

  convertAmountToStr(amount: number): string {
    if (amount < 1000) {
      return '£' + amount;
    } else if (amount >= 1000 && amount < 1000000) {
      return '£' + (amount / 1000).toFixed(2) + 'k';
    } else {
      return '£' + (amount / 1000000).toFixed(1) + 'm';
    }
  } 

}
