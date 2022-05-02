import { Product } from "./product";

export class ProductResponse {
  errorDescription: string;
  products: Product[];
  success: boolean;
}