import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

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

  purposesToStr(purposes: string[]): string {
    return purposes.join('/');
  }

}
