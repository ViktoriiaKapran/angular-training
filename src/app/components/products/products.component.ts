import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductResponse } from 'src/app/models/product-response';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  greenBackground: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response: ProductResponse) => {
      if (response.success) {
        this.products = response.products;
        console.log(this.products);
      }
    });
  }

  changeColor(isOpened: boolean) {
    this.greenBackground = isOpened;
  }

}
