export class Product {
  name: string;
  productLine: string;
  rate: number;
  minimumLoan: number;
  maximumLoan: number;
  productType: string;
  purposes: string[];
  earlyRepaymentCharges: any[];
  reversionMargin: number;
  reversionProductType: string;
  features: ProductFeature[];
  id: string;
}

export class Feature {
  amount: number;
  calculated: boolean;
  id: string;
  name: string;
  percent: number;
  visible: boolean;
}

export class ProductFeature {
  features: Feature[];
  purpose: string;
}