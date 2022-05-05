import { Component, Input, OnInit } from '@angular/core';
import { Feature, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  isOpened: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getFeatures(product: Product): Feature[] {
    if (product.features) {
      return product.features[0].features;
    } else {
      return [];
    }
  }

  purposesToStr(purposes: string[]): string {
    return purposes.join('/');
  }

}
